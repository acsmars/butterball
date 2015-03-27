/**
 * QuadTree is a class with methods designed to facilitate creating, modifying
 * and iterating across a tree structure with 4 branches per node and a list of
 * objects on every leaf.
 * Objects are sorted by quadrants based on their xy coordinates starting from the
 * top left leaf and cycling in multiple clockwise circles.
 *
 * physWidth: number that represents width of field objects occupy
 * physHeight: number that represents height of field objects occupy
 * treeLevels: # of levels of depth tree should start at
 * objects: list of physics objects to add to initial tree
 */
var QuadTree = function QuadTree(physWidth, physHeight, treeLevels) {

  //** Begin variables
  
  var currentNode = null;
  var rootNode = null;
  
  var QTNode = function QTNode(childID, parent) {
  
    //** Begin variables
    
    var _tlc = null;
    var _trc = null;
    var _brc = null;
    var _blc = null;
    var _childID = null;
    var _parent = null;
    var _objects = [];
    var _min_x = null;
    var _min_y = null;
    var _max_x = null;
    var _max_y = null;
                
    //** Begin private methods
    
    function init(childID, parent) {
      //Check if parent was assigned, default to null otherwise
      try {
        _parent = (parent.constructor.name == 'QTNode' ? parent : null);
      } catch(err) {
        _parent = null;
        //Null parent means node is root, so initalize node coordinates here
        _min_x = 0;
        _min_y = 0;
        _max_x = physWidth;
        _max_y = physHeight;
      }
      
      //Special childID check
      if (typeof childID == 'number') {
        //Check childID is within bounds
        if (childID < 0 || childID > 3){
          throw "QTNode: Error: childID is outside range 0-3";
        }
        else {
          _childID = childID;
          
          //Now that we know childID, we can determine box node represents
          var parentLength = parent.getMaxX() - parent.getMinX();
          var parentHeight = parent.getMaxY() - parent.getMinY();
          
          switch (_childID) {
            case 0:
              _min_x = parent.getMinX();
              _min_y = parent.getMinY();
              _max_x = parentLength / 2 + parent.getMinX();
              _max_y = parentHeight / 2 + parent.getMinY();
              break;
            case 1:
              _min_x = parentLength / 2 + parent.getMinX();
              _min_y = parent.getMinY();
              _max_x = parent.getMaxX();
              _max_y = parentHeight / 2 + parent.getMinY();
              break;
            case 2:
              _min_x = parentLength / 2 + parent.getMinX();
              _min_y = parentHeight / 2 + parent.getMinY();
              _max_x = parent.getMaxX();
              _max_y = parent.getMaxY();
              break;
            case 3:
              _min_x = parent.getMinX();
              _min_y = parentHeight / 2 + parent.getMinY();
              _max_x = parentLength / 2 + parent.getMinX();
              _max_y = parent.getMaxY();
              break;
          }
        }
      }
      else {
        //Otherwise set childId = null
        _childID = null;
      }
    }
    
    //** Begin public methods
    
    this.getParent = function () {
      return _parent;
    }
    
    this.getChild = function (childID) {
      
      switch(childID) {
        case 0:
          return _tlc;
        case 1:
          return _trc;
        case 2:
          return _brc;
        case 3:
          return _blc;
        default:
          throw "QTNode: Error: childID is outside range 0-3";
      }
      
    }
    
    this.getChildID = function () {
      return _childID;
    }
    
    this.changeParent = function (newParent) {
      //Check if newParent is of type QTNode, exception otherwise
      if (newParent.constructor.name == 'QTNode') {
        _parent = newParent;
      }
      else {
        throw "QTNode: Error: newParent is not object of type 'QTNode'";
      }
      
    }
    
    this.changeChild = function (childID, newChild) {
      //Check if newchild is of type QTNode, exception otherwise
      if (newChild.constructor.name != 'QTNode') {
        throw "QTNode: Error: newChild is not object of type 'QTNode'";
      }

      switch(childID) {
        case 0:
          _tlc = newChild;
          break;
        case 1:
          _trc = newChild;
          break;
        case 2:
          _brc = newChild;
          break;
        case 3:
          _blc = newChild;
          break;
        default:
          throw "QTNode: Error: childID is outside range 0-3";
      }
      
    }
    
    this.getMinX = function () {
      return _min_x;
    }
    
    this.getMinY = function () {
      return _min_y;
    }
    
    this.getMaxX = function () {
      return _max_x;
    }
    
    this.getMaxY = function () {
      return _max_y;
    }
    
    this.getObjects = function () {
      return _objects;
    }
    
    this.addObject = function (object) {
      _objects.push(object);
    }
    
    //Debug: dump value holding variables
    this.dumpValues = function () {
      return {  "hasParent" : (_parent != null),
                "childID" : _childID,
                "hasChildren" : (_tlc != null),
                "minX" : _min_x,
                "maxX" : _max_x,
                "minY" : _min_y,
                "maxY" : _max_y,
                "objects" : _objects};
    }
    
    //** Begin initalization
    
    init(childID, parent);
    
  }
  
  //** Begin private methods
  
  function init(physWidth, physHeight, treeLevels) {
    physWidth = (typeof physWidth == 'number' ? physWidth : 1000);
    physHeight = (typeof physHeight == 'number' ? physHeight : 1000);
    objects = (typeof objects == 'object' ? objectsList : []);
    
    //Special checks for tree level
    if (typeof treeLevels != 'number' || treeLevels < 1) {
      throw "QuadTree: Error: treeLevels must be greater than or equal to 1";
    }
    
    //Start by creating basic tree structure
    
    //Create root node
    rootNode = new QTNode();
    //Set start position
    currentNode = rootNode;
    //Fill tree with nodes starting at root
    fillTree(0);
  }
  
    
  // Fill tree to treeLevel level with nodes
  var fillTree = function (currentLevel) {
  
    var workingNode = currentNode;
    
    if (currentLevel < treeLevels) {
      for (var i = 0; i < 4; i++) {
        //Add new child node
        currentNode.changeChild(i, new QTNode(i, currentNode));
        //Start fill function on new child node
        currentNode = workingNode.getChild(i);
        fillTree(currentLevel + 1);
        //Reset currentNode to working node
        currentNode = workingNode;
      }
    }
    
  }
  
  var searchTreeXY = function (object){
    //Start at top of tree
    //Recursive search nodes for correct one, and return it
    //If none found, add object to root node (special case)
    
    var result = recurseSearchXY(object, rootNode);
    
    //Reset currentNode
    currentNode = rootNode;
    
    if (result != null) {
      return result;
    }
    else {
      return rootNode;
    }
    
  }
  
  var recurseSearchXY = function (object, currentNode) {
    //If no children, search over
    //Only have to check one child as tree is gaurenteed full
    if (currentNode.getChild(0) == null) {
      return currentNode;
    }
    else {
      //Check if object XY in node area
      if (currentNode.getMinX() < object.x &&
          currentNode.getMinY() < object.y &&
          currentNode.getMaxX() >= object.x &&
          currentNode.getMaxY() >= object.y)
      {
        //Recurse deeper
        for (var i = 0; i < 4; i++) {
          var result = recurseSearchXY(object, currentNode.getChild(i));
          if (result != null) {
            return result;
          }
        }
      }
      else {
        //Object not in node area
        return null;
      }
      
    }
  }
  
  var getNodeList = function () {
    var nodeList = [];
  
    //Start at root node
    currentNode = rootNode;
    workingNode = currentNode;
    
    //Recurse through all nodes, adding new ones to list of nodes
    recurseNodeList(currentNode, nodeList);
    
    function recurseNodeList (currentNode, nodeList) {
      nodeList.push(currentNode);
      
      //If node has children, follow them
      if (currentNode.getChild(0) != null) {
        for (var i = 0; i < 4; i++) {
          //Contine recursing on child nodes
          currentNode = workingNode.getChild(i);
          recurseNodeList(currentNode, nodeList);
          //Reset currentNode to working node
          currentNode = workingNode;
        }
      }
    }
    return nodeList;
    
  }
  
  //** Begin public methods
  
  // Debug: Print all nodes in tree
  this.printTree = function () {
    for (node of getNodeList()) {
      console.log(node.dumpValues());
    }
    
  }
  
  // Add passed in object via appropriate addition method
  this.addObject = function (newObject) {
    if (newObject.type == "wall") {
      //Walls need special logic
    }
    else {
      //Determine which node object belongs in and add it to that node
      searchTreeXY(newObject).addObject(newObject);
    }
  }
  
  //Export list of all added objects for use in other functions
  this.exportObjectList = function (currentLevel) {
    var objects = [];
    
    for (node of getNodeList()) {
      objects = objects.concat(node.getObjects());
    }
    
    return objects;
  }
  
  //** Begin initalization
  
  init(physWidth, physHeight, treeLevels);
  
}
