class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

class LinkedList{
  constructor(head, size) {
    this.head = null
    this.size = 0
  }
  add(index, element) {
    if(arguments.length === 1) {
      element = index
      index = this.size
    }
    if(index < 0 || index > this.size) {
      throw new Error('cross the border')
    }
    if(index === 0) {
      let head = this.head
      this.head = new Node(element, head)
    } else {

      console.log(index)
      let prevNode = this._getNode(index-1)
      prevNode.next = new Node(element, prevNode.next)
    }
    this.size++
  }
  _getNode(index) {
    if(index < 0 || index >= this.size) {
      throw new Error('cross the border')
    }
    let current = this.head
    for(let i = 0;i< index;i++) {
      current = current.next
    }
    return current
  }
  remove(index) {
    let removeNode = null
    if(index === 0) {
      removeNode = this.head
      if(!removeNode) {
        return removeNode 
      }
      this.head = removeNode.next
    } else {
      let prevNode = this._getNode(index-1)
      removeNode = prevNode.next
      prevNode.next = prevNode.next.next
    }
    this.size--
    return removeNode
  }
  set(index,element) {
    let node = this._getNode(index-1)
    node.element = element
  }
  get(index) {
    return this._getNode(index)
  }
  clear() {
    this.head = null
    this.size = 0
  }
}


// const l1 = new LinkedList()
// l1.add('1')
// l1.add('2')
// l1.add(1, '3')
// console.log(l1)
// l1.remove(1)
// console.log(l1)

class Queue{
  constructor() {
    this.linkedList = new LinkedList()
  }
  enQueue(data) {
    this.linkedList.add(data)
  }
  deQueue() {
    return this.linkedList.remove(0)
  }
}

// const q = new Queue()
// q.enQueue('1')
// q.enQueue('2')
// let a = q.deQueue()
// console.log(a)

module.exports = {
  Queue
} 