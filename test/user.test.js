import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

describe('POST /api/users', function () {

    beforeEach(async () => {
        await removeTestUser();
    });
    afterEach(async () => {
        await removeTestUser();
    });

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'mrglxor',
                password: 'rahasia',
                name: 'Mr Glx Or'
            });
            
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('mrglxor');
        expect(result.body.data.name).toBe('Mr Glx Or');
        expect(result.body.data.password).toBeUndefined();
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username : '',
                password : '',
                name : ''
            });
        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if username already registered', async () => {
        const userData = {
            username: 'mrglxor',
            password: 'rahasia',
            name: 'Mr Glx Or'
        }
        let result = await supertest(web)
        .post('/api/users')
        .send(userData);
        
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe(userData.username);
        expect(result.body.data.name).toBe(userData.name);
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
        .post('/api/users')
        .send(userData);

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('POST /api/users/login', function () {
    beforeEach(async () => {
        await createTestUser();
    });
    afterEach(async () => {
        await removeTestUser();
    });
    it('should can login', async () => {
        const result = await supertest(web)
                .post('/api/users/login')
                .send({
                    username: 'mrglxor',
                    password: 'rahasia'
                });
        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe('Token');
    });

    it('should reject login if password is wrong', async () => {
        const result = await supertest(web)
                .post('/api/users/login')
                .send({
                    username: 'mrglxor',
                    password: 'salah'
                });
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if username is wrong', async () => {
        const result = await supertest(web)
                .post('/api/users/login')
                .send({
                    username: 'salah',
                    password: 'rahasia'
                });
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/users/current', function() {
    beforeEach(async () => {
        await createTestUser();
    });
    afterEach(async () => {
        await removeTestUser();
    });

    it('should can get current user', async () => {
        const result = await supertest(web)
                .get('/api/users/current')
                .set('Authorization','Token');

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('mrglxor');
        expect(result.body.data.name).toBe('Mr Glx Or');
    });

    it('should reject if token is invalid', async () => {
        const result = await supertest(web)
                .get('/api/users/current')
                .set('Authorization','salah');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('PATCH /api/users/current', function() {
    beforeEach(async () => {
        await createTestUser();
    });
    afterEach(async () => {
        await removeTestUser();
    });
    
    it('should can update user', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization','Token')
            .send({
                name: 'Farhan',
                password: 'rahasialagi'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('mrglxor');
        expect(result.body.data.name).toBe('Farhan');

        const user = await getTestUser();
        expect(await bcrypt.compare('rahasialagi',user.password)).toBe(true);
    });

    it('should can update user name', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization','Token')
            .send({
                name: 'Farhan',
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('mrglxor');
        expect(result.body.data.name).toBe('Farhan');
    });
    
    it('should can update user password', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization','Token')
            .send({
                password: 'rahasialagi'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('mrglxor');
        expect(result.body.data.name).toBe('Mr Glx Or');

        const user = await getTestUser();
        expect(await bcrypt.compare('rahasialagi',user.password)).toBe(true);
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization','salah')
            .send({});

        expect(result.status).toBe(401);
    });
});

describe('DELETE /api/users/logout',function(){
    beforeEach(async () => {
        await createTestUser();
    });
    afterEach(async () => {
        await removeTestUser();
    });

    it('should can logout', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization','Token');
        
            expect(result.status).toBe(200);
            expect(result.body.data).toBe('OK');

            const user = await getTestUser();
            expect(user.token).toBeNull();
    });

    it('should reject logout if token is invalid', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization','salah');
        
            expect(result.status).toBe(401);
    });
});