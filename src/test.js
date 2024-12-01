const p1 = {
    firstname: 'first',
    lastName: 'last'
}

const p2 = p1
console.log(p1===p2) //true

p2.firstname = 'p2'


const p3 = {...p1}
p3.firstname = 'p2'



//node test.js 


