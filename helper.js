function rbtree()
{
	this.root = null;
}

function Node(key, lChild, rChild, color, sibling)
{
	this.key = key;
	this.lChild = lChild;
	this.rChild = rChild;
	this.color = color;
	this.sibling = sibling;
}



rbtree.prototype = 
{
	getGrandparent: function(pNode)
	{
		if(pNode == root)
			return false;
		var temp = root;
		var gradPa = null;
		//console.log(temp + ' and ' + pNode)
		while(temp.key != pNode.key)
		{
			if(pNode.key > temp.key)
			{
				gradPa = temp;
				temp = temp.rChild;
			}
			else if(pNode.key < temp.key)
			{
				gradPa = temp;
				temp = temp.lChild;
			}
			else 
				return false
		}
		return gradPa;
	},

	leftRotate: function(grandpa, parent, node)
	{
		var parentOfGradPa = this.getGrandparent(grandpa);
		/*if(parentOfGradPa != false)
		{
			if (parentOfGradPa.lChild == grandpa)
				parentOfGradPa.lChild = parent;
			else if(parentOfGradPa.rChild == grandpa)
				parentOfGradPa.rChild = parent; 
		}
		else
		{*/
			this.root = parent;
		//}
		grandpa.rChild = parent.lChild;
		parent.lChild = grandpa;
		console.log(root)
		grandpa.color = 'red';
		parent.color = 'black';

	},

	
	constraints: function(pNode, node)
	{
		var gradPa = this.getGrandparent(pNode);
		if(this.root.color == 'red')
			this.root.color = 'black';
		else if(pNode.color == 'red' && pNode.sibling != null && pNode.sibling.color == 'red')
		{
			pNode.color = 'black';
			pNode.sibling.color = 'black';
			gradPa.color = 'red';
		} 
		else if(pNode.sibling == null && pNode.color == 'red')
		{
			this.leftRotate(gradPa,pNode,node);
		}
	},

	insert: function(key)
	{
		var insertNode = new Node(key, null, null, 'red', null);
		if(this.root == null)
		{
			this.root = insertNode;
			this.root.color = 'black';
		}
		else
		{
			var temp = this.root;
			var parent = null;
			while(temp != null)
			{
				parent = temp;
				if(key > temp.key)
					temp = temp.rChild;
				else if(key < temp.key)
					temp = temp.lChild;
				else
				{
					console.log("the node is already exist");
					break;
				}
			}
			if(key < parent.key)
			{
				parent.lChild = insertNode;
				if(parent.rChild != null)
				{
					parent.lChild.sibling = parent.rChild;
					parent.rChild.sibling = parent.lChild;
				}
			}
			else if(key > parent.key)
			{
				parent.rChild = insertNode;
				if(parent.lChild != null)
				{
					parent.rChild.sibling = parent.lChild;
					parent.lChild.sibling = parenr.rChild;
				}
			}

			this.constraints(parent, insertNode);
		}		
	}
}

var tree = new rbtree();
tree.insert(1);
tree.insert(2);
tree.insert(3);
var temp = tree.root;
while(temp != null)
{
	console.log("key = " + temp.key + " lchild = " + temp.lChild + "rChild = " + temp.rChild + " color = " + temp.color);
	temp = temp.rChild;
}