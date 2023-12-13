import supertest from "supertest";
import { createManyTestContact, createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeTestUser } from "./test-util.js";
import {web} from "../src/application/web.js";

describe('POST /api/contacts', function () {

    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can create new contact', async () => {
        const result = await supertest(web)
                .post("/api/contacts")
                .set('Authorization','Token')
                .send({
                    firstName: 'Muhamad',
                    lastName: 'Farhan',
                    email: 'hans@gmail.com',
                    phone: '0809143242367'
                });

            expect(result.status).toBe(200);
            expect(result.body.data.id).toBeDefined();
            expect(result.body.data.firstName).toBe('Muhamad');
            expect(result.body.data.lastName).toBe('Farhan');
            expect(result.body.data.email).toBe('hans@gmail.com');
            expect(result.body.data.phone).toBe('0809143242367');
    });
});

describe('GET /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('sholud can get contact', async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
                .get(`/api/contacts/${testContact.id}`)
                .set('Authorization','Token');

            expect(result.status).toBe(200);
            expect(result.body.data.id).toBe(testContact.id);
            expect(result.body.data.firstName).toBe(testContact.firstName);
            expect(result.body.data.lastName).toBe(testContact.lastName);
            expect(result.body.data.email).toBe(testContact.email);
            expect(result.body.data.phone).toBe(testContact.phone);
    });

    it('sholud return 404 if contact id is not found', async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
                .get(`/api/contacts/${testContact.id + 1}`)
                .set('Authorization','Token');

            expect(result.status).toBe(404);
    });
});

describe('PUT /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can update existing contact', async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
                .put(`/api/contacts/${testContact.id}`)
                .set('Authorization','Token')
                .send({
                    firstName: 'Han',
                    lastName: 'Anggle',
                    email: 'anggl@gmail.com',
                    phone: '073494239432',
                });
        
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.firstName).toBe('Han');
        expect(result.body.data.lastName).toBe('Anggle');
        expect(result.body.data.email).toBe('anggl@gmail.com');
        expect(result.body.data.phone).toBe('073494239432');
    });

    it('should reject if request is invalid', async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
                .put(`/api/contacts/${testContact.id}`)
                .set('Authorization','Token')
                .send({
                    firstName: '',
                    lastName: 'Anggle',
                    email: 'anggl.com',
                    phone: '07349',
                });
        
        expect(result.status).toBe(400);
    });

    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
                .put(`/api/contacts/${testContact.id + 1}`)
                .set('Authorization','Token')
                .send({
                    firstName: 'Han',
                    lastName: 'Anggle',
                    email: 'anggl@gmail.com',
                    phone: '073494239432',
                });
        
        expect(result.status).toBe(404);
    });
});

describe('DELETE /api/contacts/:contactId', function() {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can delete contact', async () => {
        let testContact = await getTestContact();
        const result = await supertest(web)
                .delete(`/api/contacts/${testContact.id}`)
                .set('Authorization','Token');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testContact = await getTestContact();

        expect(testContact).toBeNull();
    });
});

describe('GET /api/contacts', function() {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can search without parameter',async () => {
        const result = await supertest(web)
                .get('/api/contacts')
                .set('Authorization','Token');

            expect(result.status).toBe(200);
            expect(result.body.data.length).toBe(10);
            expect(result.body.paging.page).toBe(1);
            expect(result.body.paging.totalPage).toBe(2);
            expect(result.body.paging.totalItem).toBe(15);
    });

    it('should can search to page 2',async () => {
        const result = await supertest(web)
                .get('/api/contacts')
                .query({
                    page: 2
                })
                .set('Authorization','Token');

            expect(result.status).toBe(200);
            expect(result.body.data.length).toBe(5);
            expect(result.body.paging.page).toBe(2);
            expect(result.body.paging.totalPage).toBe(2);
            expect(result.body.paging.totalItem).toBe(15);
    });

    it('should can search using name',async () => {
        const result = await supertest(web)
                .get('/api/contacts')
                .query({
                    name: 'test 1'
                })
                .set('Authorization','Token');

            expect(result.status).toBe(200);
            expect(result.body.data.length).toBe(6);
            expect(result.body.paging.page).toBe(1);
            expect(result.body.paging.totalPage).toBe(1);
            expect(result.body.paging.totalItem).toBe(6);
    });
    it('should can search using email',async () => {
        const result = await supertest(web)
                .get('/api/contacts')
                .query({
                    email: 'test1'
                })
                .set('Authorization','Token');

            expect(result.status).toBe(200);
            expect(result.body.data.length).toBe(6);
            expect(result.body.paging.page).toBe(1);
            expect(result.body.paging.totalPage).toBe(1);
            expect(result.body.paging.totalItem).toBe(6);
    });
    it('should can search using phone',async () => {
        const result = await supertest(web)
                .get('/api/contacts')
                .query({
                    phone: '0809123451'
                })
                .set('Authorization','Token');

            expect(result.status).toBe(200);
            expect(result.body.data.length).toBe(6);
            expect(result.body.paging.page).toBe(1);
            expect(result.body.paging.totalPage).toBe(1);
            expect(result.body.paging.totalItem).toBe(6);
    });
});