function rbtree()
{
	this.root = null;
}

function Node(key, lChild, rChild, color)
{
	this.key = key;
	this.lChild = lChild;
	this.rChild = rChild;
	this.color = color;
	this.parent = null;
}

rbtree.prototype = 
{

	getUncle: function(node)
	{
		var gradPa = this.getGrandparent(node);
		if (gradPa == null)
			return null;
		if (node.parent == gradPa.lChild)
			return gradPa.rChild;
		else
			return gradPa.lChild; 
	},
	getGrandparent: function(node)
	{
		if(node!= null && node.parent != null)
			return node.parent.parent;
		else
			return null;	
	},

	constraints1: function(node)
	{
		if(node.parent == null)
			node.color = 'black';
		else
			this.constraints2(node);
	},

	constraints2: function(node)
	{
		if(node.parent.color == 'black')
			return;
		else
			this.constraints3(node);
	},
	constraints3: function(node)
	{
		var uncle = this.getUncle(node);
		if(uncle!= null && uncle.color == 'red')
		{
			node.parent.color = 'balck';
			uncle.color = 'black';
			var gradPa = this.getGrandparent(node);
			gradPa.color = 'red';
			this.constraints1(gradPa);
		} else {

			this.constraints4(node);
		}
	},
	constraints4: function(node)
	{
		var gradPa = this.getGrandparent(node);
		if( node == node.parent.rChild && node.parent == gradPa.lChild)
		{
			temp1 = node.parent.lChild;
			temp2 = node.lChild;
			gradPa.lChild = node;
			node.lChild = temp1;
			temp1.rChild = temp2;
			node = node.lChild;
		}
		else if((node == node.parent.lChild) && (node.parent == gradPa.rChild))
		{
			temp1 = node.parent.rChild;
			temp2 = node.rChild;
			gradPa.rChild = node;
			node.rChild = temp1;
			temp1.lChild = temp2;
			node = node.rChild;
		}
		this.constraints5(node);
	
	},
	constraints5: function(node)
	{
		var gradPa = this.getGrandparent(node);
		node.parent.color = 'black';
		gradPa.color = 'red';

		if(gradPa == this.root)
		{
			this.root = node.parent;
			node.parent.parent = null;
		}
		if(gradPa.parent != null)
		{

			if(gradPa == gradPa.parent.lChild)
				gradPa.parent.lChild = node.parent;
			else if(gradPa == gradPa.parent.rChild)
				gradPa.parent.rChild = node.parent;
		}
		if(node == node.parent.lChild)
		{

			temp1 = node.parent.rChild;
			node.parent.rChild = gradPa;
			gradPa.lChild = temp1;
			gradPa.parent = node.parent;
		}
		else
		{
			temp1 = node.parent.lChild;
			node.parent.lChild = gradPa;
			gradPa.rChild = temp1;
			gradPa.parent = node.parent;
		}
	},

	output: function()
	{
		var temp = this.root;
		console.log(tree)
	},

	insert: function(key)
	{
		var insertNode = new Node(key, null, null, 'red');
		if(this.root == null)
		{
			this.root = insertNode;
			this.parent == null;
			this.constraints1(insertNode);
		}
		else
		{
			var temp = this.root;
			while(temp != null)
			{
				insertNode.parent = temp;
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
			if(key < insertNode.parent.key)
				insertNode.parent.lChild = insertNode;
			else if(key > insertNode.parent.key)
				insertNode.parent.rChild = insertNode;
	
			
			this.constraints1(insertNode);
		}		

	},

	getSibling: function(node)
	{
		if(node == node.parent.lChild)
			return node.parent.rChild;
		else
			return n.parent.lChild;
	},

	rotate_left: function(node)
	{
		temp = sibling.lChild;
		if(node.parent.parent != null)
		{
			sibling.parent = node.parent.parent;
			if(node.parent == node.parent.parent.lChild)
				node.parent.parent.lChild = sibling;
			else
				node.parent.parent.rChild = sibling;
		}	
		node.parent.parent = sibling;
		sibling.lChild = node.parent;
		node.parent.rChild = temp;
	}

	deConstraints1: function(node)
	{
		if(node.parent != null)
			this.deConstraints2(node);
	},

	deConstraints2: function(node)
	{
		var sibling = this.getSibling(node);

		if(sibling.color == 'red')
		{
			node.parent.color = 'red';
			sibling.color = 'black';
			if(node == node.parent.lChild)
				this.rotate_left(node);
			else if(node == node.parent.rChild)
				
		}
	},


	delete: function(key)
	{
		var temp = this.root;
		while(temp != null)
		{
			if(key > temp.key)
				temp = temp.rChild;
			else if(key < temp.key)
				temp = temp.lChild;
			else
				break;
		}
		if(temp.lChild != null)
			var child = temp.lChild;
		else if( temp.rChild != null)
			var child = temp.rChild;

		//replace node
		child.parent = temp.parent;
		if(temp = temp.parent.lChild)
			temp.parent.lChild = child;
		else if(temp = temp.parent.rChild)
			temp.parent.rChild = child;

		if(temp.color == 'black')
		{
			if(child.color == 'red')
				child.color = 'black';
			else
				this.deConstraints1(child);	
		}
	}

}

var tree = new rbtree();
tree.insert(1);
tree.insert(5);
tree.insert(7);
tree.insert(3);
tree.insert(4);
tree.insert(2);
tree.insert(6);
tree.insert(9);

tree.output();