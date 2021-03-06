import * as jwt from 'jwt-simple';
import * as HTTPStatus from 'http-status';
import { app, request, expect } from './config/helpers';

describe('Testes de Integração', () => {

    'use strict';
    const config = require('../../server/config/env/config')();
    const model = require('../../server/models');

    let id;
    let token;

    const userTest = {
        id: 100,
        name: 'Usuário Teste',
        email: 'teste@email.com',
        password: 'teste'
    };

    const userDefault = {
        id: 1,
        name: 'joao',
        email: 'joao@email.com',
        password: '123'
    };

    beforeEach((done) => {
        model.User.destroy({
            where: {}
        })
        .then(() => {
            return model.User.create(userDefault);
        })
        .then(user => {
            model.User.create(userTest)
            .then(() => {
                token = jwt.encode({id: user.id}, config.secret);
                done();
            })
        })
    });
    
    describe('POST /token', () => {
        it('Deve receber um JWT', done => {
          const credentials = {
            email: userDefault.email,
            password: userDefault.password
          };
          request(app)
            .post('/token')
            .send(credentials)
            .end((error, res) => {
              expect(res.status).to.equal(HTTPStatus.OK);
              expect(res.body.token).to.equal(`${token}`);
              done(error);
            });
        });
    
        it('Não deve gerar Token', done => {
          const credentials = {
            email: 'email@emailqualquer.com',
            password: 'qualquer'
          };
          request(app)
            .post('/token')
            .send(credentials)
            .end((error, res) => {
              expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
              expect(res.body).to.empty;
              done(error);
            })
        })
      })
 
    describe('GET /api/users/all', () =>{
        it('Deve retornar um Array com todos os Usuários', done => {
            request(app)
            .get('/api/users/all')
            .set('Content-Type', 'Application/Json')
            .set('Authorization', `JWT ${token}`)
            .end((error, res) =>{
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.body.payload).to.be.an('array');
                expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                done(error);
            })
        });
    });

     describe('GET /api/users/:id', () =>{
        it('Deve retornar um Array com apenas um Usuário', done => {
           request(app)
            .get(`/api/users/${userDefault.id}`)
            .set('Content-Type', 'Application/Json')
            .set('Authorization', `JWT ${token}`)
            .end((error, res) =>{
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.body.payload.id).to.be.equal(userDefault.id);
                expect(res.body.payload).to.have.all.keys([
                    'id','name','email','password'
                ]);
                id = res.body.payload.id;
                done(error);
            })
        });
    });

    describe('PUT /api/users/create', () =>{
        it('Deve atualizar um Usuário', done => {
           const user = {
               id: 1,
               name: 'Test',
               email: 'usuario@email.com',
               password: 'novouser'
            };
            request(app)
            .get('/api/users/create')
            .set('Content-Type', 'Application/Json')
            .set('Authorization', `JWT ${token}`)
            .send(user)
            .end((error, res) =>{
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.body.payload.id).to.be.eql(user.id);
                expect(res.body.payload.name).to.be.eql(user.name);
                expect(res.body.payload.email).to.be.eql(user.email);
                done(error);
            })
        });
    });

    describe('PUT /api/users/:id/update', () => {
        it('Deve atualizar um Usuário', done => {
          const user = {
            name: '',
            email: ''
          };
          request(app)
            .put(`/api/users/${userTest.id}/update`)
            .set('Content-Type', 'Application/Json')
            .set('Authorization', `JWT ${token}`)
            .send(user)
            .end((error, res) => {
              expect(res.status).to.equal(HTTPStatus.OK);
            });
        });
      });

      describe('DELETE /api/users/:id/destroy', () => {
        it('Deve remover um usário', done => {
          request(app)
            .del(`/api/users/${userTest.id}/destroy`)
            .set('Content-Type', 'Application/Json')
            .set('Authorization', `JWT ${token}`)
            .end((error, res) => {
              expect(res.status).to.equal(HTTPStatus.OK);
              done(error);
            });
        });
      });

});
