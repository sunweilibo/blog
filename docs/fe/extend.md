---
title:继承
---
### 原型链

```javascript
function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function() {
  return this.property;
}

function SubType() {
  this.subproperty = false;
}

SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function() {
  return this.subproperty;
}

var instance = new SubType();
alert(instance.subproperty); // true
```

问题：

​	super属性定义在原型中，所有实例共用此属性。

### 借用构造函数

```javascript
function SuperType() {
  this.colors = ['red', 'black'];
}

function SubType() {
  SuperType.call(this);
}
```

解决了属性复用的问题

问题：

	+ 方法都在构造函数中定义，无法服用函数
	+ 超类型原型中定义的方法，子类型不可见，这样，所有类型智能使用构造函数模式。

### 组合继承

```javascript
function SuperType(name) {
  this.colors = ['red', 'black'];
  this.name = name;
}

SuperType.prototype.sayName = function() {
  return this.name;
}
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.syaAge = function() {
  alert(this.age);
}
```

解决了上面两种方案的问题。

但是实例属性和原型链上都会有colors和name属性，只是实例属性覆盖了原型属性。

### 原型式继承

``` 
function object(o) {
	function F(){}
	F.prototype = o;
	return new F();
}
```

问题: 相当于创建了person的两个副本

```javascript
var person = {
  name: 'haha',
  friends: ['a', 'b', 'c']
}

var anotherPerson = object(person);
anotherPerson.friends.push('d');

var yetAnotherPerson = object(person);
yetAnotherPerson.push('e');

alert(person.friends); // ['a', 'b', 'c', 'd', 'e']
```



### 寄生式继承

```
function createAnother(origin) {
	var clone = object(origin);
	clone.sayHi = function(){
		alert('hi');
	}
	return clone;
}
```



### 寄生组合式继承

```javascript
function SuperType(name) {
  this.colors = ['red', 'black'];
  this.name = name;
}

SuperType.prototype.sayName = function() {
  return this.name;
}
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

var prototype = Object.create(SuperType.prototype);
prototype.constructor = SubType;
SubType.prototype = prototype;
SubType.prototype.syaAge = function() {
  alert(this.age);
}
```

只会在实例中存在name和colors属性