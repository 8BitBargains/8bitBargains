const db = require('../db');
const app = require('../index');
const Order = db.model('order');
const User = db.model('user');
const {expect} = require('chai');
const supertest = require('supertest');
const agent = supertest.agent(app);

describe('Order Routes ', () => {

  beforeEach('Synchronize and clear database', () => db.sync({force: true}));

  after('Synchronize and clear database', () => db.sync({force: true}));

    // describe('Order routes', () => {
    //   beforeEach(() => {
    //     return db.sync({force: true});
    //   });
    
    //   describe('/api/orders/', () => {
    //     const codysEmail = 'cody@puppybook.com';
    //     const address = '42 Wallabe Way,Sydney,AU';
    //     const sessionId = 'fakeSessionId1';
    
    //     beforeEach(() => {
    //       return User.create({
    //         email: codysEmail,
    //         password: '123',
    //       })
    //       .then(user => {
    //         // don't know how to get a req.user on a fake user
    //       })
    //       .then(Order.create({
    //           address, sessionId
    //       }));
    //     });
    
    //     it('GET /api/orders', () => {

    //       return agent
    //         .post('/login')
    //         .send({

    //         })
    //         .get('/api/orders')
    //         .expect(200)
    //         .then(res => {
    //           expect(res.body).to.be.an('array');
    //           expect(res.body[0].address).to.be.equal(address);
    //         });
    //     });
    //   }); // end describe('/api/orders')
    // }); // end describe('Order routes')

    // describe('HTTP Server', () => {

    //     let agent;
    //     beforeEach('Set up agent for testing', () => {
    //         agent = supertest(app);
    //     });

    //     describe('api routes', () => {

    //         let obama;
    //         let biden;
    //         beforeEach('Seed users', () => {
    //             const users = [
    //                 {email: 'obama@gmail.com'},
    //                 {email: 'biden@gmail.com'}
    //             ];
    //             return User.bulkCreate(users, {returning: true})
    //                 .then(createdUsers => {
    //                     obama = createdUsers[0].id;
    //                     biden = createdUsers[1].id;
    //                 });
    //         });

    //         let obamaFirstMessage;
    //         let bidenFirstMessage;
    //         let obamaSecondMessage;
    //         beforeEach('Seed messages', () => {

    //             const messages = [
    //                 {
    //                     toId: biden,
    //                     fromId: obama,
    //                     body: 'HEYOOOOOOO'
    //                 },
    //                 {
    //                     toId: obama,
    //                     fromId: biden,
    //                     body: 'WAAASSUUUUPP??'
    //                 },
    //                 {
    //                     toId: biden,
    //                     fromId: obama,
    //                     body: 'nmu?'
    //                 }
    //             ];

    //             return Message.bulkCreate(messages, {returning: true})
    //                 .then(createdMessages => {
    //                     obamaFirstMessage = createdMessages[0].id;
    //                     bidenFirstMessage = createdMessages[1].id;
    //                     obamaSecondMessage = createdMessages[2].id;
    //                 });

    //         });

    //         describe('users', () => {

    //             it('serves up all users on request to GET /', () => {
    //                 return agent
    //                     .get('/users')
    //                     .expect(200)
    //                     .then(res => {
    //                         expect(res.body).to.be.an('array');
    //                         expect(res.body.length).to.be.equal(2);
    //                         expect(res.body).to.contain.a.thing.with('id', obama);
    //                         expect(res.body).to.contain.a.thing.with('id', biden);
    //                     });
    //             });

    //             xit('updates a user at PUT /{{usersId}}, sending a 201 response', () => {
    //                 return agent
    //                     .put(`/users/${obama}`)
    //                     .send({
    //                         email: 'potus@hotmail.com'
    //                     })
    //                     .expect(201)
    //                     .then(res => {
    //                         return User.findById(obama);
    //                     })
    //                     .then(user => {
    //                         expect(user.email).to.be.equal('potus@hotmail.com');
    //                     });
    //             });

    //         });

    //         describe('messages', () => {

    //             // find all messages whose `to` field matches the variable ID

    //             xit('serves up all messages to a specific user on GET /to/{{recipientId}}', () => {
    //                 return agent
    //                     .get(`/messages/to/${obama}`)
    //                     .expect(200)
    //                     .then(res => {
    //                         expect(res.body).to.be.an('array');
    //                         expect(res.body.length).to.be.equal(1);
    //                         expect(res.body[0].body).to.be.equal('WAAASSUUUUPP??');
    //                     });
    //             });

    //             // find all messages whose `from` field matches the variable ID

    //             xit('serves up all messages from a specific sender on GET /from/{{senderId}}', () => {
    //                 return agent
    //                     .get(`/messages/from/${obama}`)
    //                     .expect(200)
    //                     .then(res => {
    //                         expect(res.body).to.be.an('array');
    //                         expect(res.body.length).to.be.equal(2);
    //                         expect(res.body).to.contain.a.thing.with.property('body', 'HEYOOOOOOO');
    //                         expect(res.body).to.contain.a.thing.with.property('body', 'nmu?');
    //                     });
    //             });

    //             // remember eager loading?

    //             xit('serves up all messages—WITH FILLED IN REFERENCES—to a specific user on GET /to/{{recipientId}}', () => {
    //                 return agent
    //                     .get(`/messages/to/${obama}`)
    //                     .expect(200)
    //                     .then(res => {
    //                         expect(res.body).to.be.an('array');
    //                         expect(res.body.length).to.be.equal(1);
    //                         expect(res.body[0].from.email).to.be.equal('biden@gmail.com');
    //                         expect(res.body[0].to.email).to.be.equal('obama@gmail.com');
    //                     });
    //             });

    //             xit(`serves up all messages from a specific sender on GET /from/{{senderId}}
    //                 and uses the Message model static getAllWhereSender in the process`, () => {

    //                 // http://sinonjs.org/docs/#spies
    //                 const getAllWhereSenderSpy = sinon.spy(Message, 'getAllWhereSender');

    //                 return agent
    //                     .get(`/messages/from/${obama}`)
    //                     .expect(200)
    //                     .then(res => {

    //                         expect(res.body).to.be.an('array');
    //                         expect(res.body.length).to.be.equal(2);

    //                         expect(getAllWhereSenderSpy.called).to.be.equal(true);
    //                         expect(getAllWhereSenderSpy.calledWith(obama.toString())).to.be.equal(true);

    //                         getAllWhereSenderSpy.restore();

    //                     });

    //             });

    //             xit('adds a new message on POST /, responding with 201 and created message', () => {

    //                 return agent
    //                     .post('/messages')
    //                     .send({
    //                         fromId: biden,
    //                         toId: obama,
    //                         body: 'You are my best friend. I hope you know that.'
    //                     })
    //                     .expect(201)
    //                     .then(res => {
    //                         const createdMessage = res.body;
    //                         return Message.findById(createdMessage.id)
    //                     })
    //                     .then(foundMessage => {
    //                         expect(foundMessage.body).to.be.equal('You are my best friend. I hope you know that.');
    //                     });

    //             });

    //         });

    //     });
});
