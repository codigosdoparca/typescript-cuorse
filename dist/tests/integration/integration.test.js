"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('Testes de Integração', function () {
    describe('GET /api/users/all', function () {
        it('Deve retornar um Json com todos os Usuários', function (done) {
            /*request(app)
            .get('/api/users/all')
            .end((error, res) =>{
                expect(res.status).to.equal(200);
            })*/
        });
    });
    describe('GET /api/users/:id', function () {
        it('Deve retornar um Json com apenas um Usuário', function (done) {
            /* request(app)
             .get(`/api/users/${1}`)
             .end((error, res) =>{
                 expect(res.status).to.equal(200);
             })*/
        });
    });
    describe('POST /api/users/new', function () {
        it('Deve criar um novo Usuário', function (done) {
            /*  const user = {
                  nome: 'Test'
              }
              request(app)
              .post('/api/users/new')
              .send(user)
              .end((error, res) =>{
                  expect(res.status).to.equal(200);
              })*/
        });
    });
    describe('PUT /api/users/:id/edit', function () {
        it('Deve atualizar um Usuário', function (done) {
            /* const user = {
                 nome: 'TestUpdate'
             }
             request(app)
             .put(`/api/users/${1}/edit`)
             .send(user)
             .end((error, res) =>{
                 expect(res.status).to.equal(200);
             })*/
        });
    });
    describe('DELETE /api/users/:id', function () {
        it('Deve deletar um Usuário', function (done) {
            /*  request(app)
              .put(`/api/users/${1}`)
              .end((error, res) =>{
                  expect(res.status).to.equal(200);
              })*/
        });
    });
});
