import supertest from "supertest";
import { createTestAddress, createTestContact, createTestUser, getTestAddress, getTestContact, removeAllTestAddresses, removeAllTestContacts, removeTestUser } from "./test-util.js";
import {web} from "../src/application/web.js";

describe('POST /api/contacts/:contactId/addresses', function(){
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });
    afterEach(async () => {
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can create new address', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
                .post(`/api/contacts/${testContact.id}/addresses`)
                .set('Authorization','Token')
                .send({
                    street: 'jalan test',
                    city: 'kota test',
                    province: 'provinsi test',
                    country: 'indonesia',
                    postalCode: '234567',
                });

            expect(result.status).toBe(200);
            expect(result.body.data.id).toBeDefined();
            expect(result.body.data.street).toBe('jalan test');
            expect(result.body.data.city).toBe('kota test');
            expect(result.body.data.province).toBe('provinsi test');
            expect(result.body.data.country).toBe('indonesia');
            expect(result.body.data.postalCode).toBe('234567');
    });
    it('should reject if address request is invalid', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
                .post(`/api/contacts/${testContact.id}/addresses`)
                .set('Authorization','Token')
                .send({
                    street: 'jalan test',
                    city: 'kota test',
                    province: 'provinsi test',
                    country: '',
                    postalCode: '',
                });

            expect(result.status).toBe(400);
    });
    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
                .post(`/api/contacts/${testContact.id + 1}/addresses/`)
                .set('Authorization','Token')
                .send({
                    street: 'jalan test',
                    city: 'kota test',
                    province: 'provinsi test',
                    country: '',
                    postalCode: '',
                });

            expect(result.status).toBe(404);
    });
    it('should reject if addressId is not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
                .post(`/api/contacts/${testContact.id + 1}/addresses`)
                .set('Authorization','Token')
                .send({
                    street: 'jalan test',
                    city: 'kota test',
                    province: 'provinsi test',
                    country: '',
                    postalCode: '',
                });

            expect(result.status).toBe(404);
    });
});

describe('GET /api/contacts/:contactId/addresses/:addressId', function(){
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    });
    afterEach(async () => {
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can get contact', async () => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
                .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
                .set('Authorization','Token');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.street).toBe('jalan test');
        expect(result.body.data.city).toBe('kota test');
        expect(result.body.data.province).toBe('provinsi test');
        expect(result.body.data.country).toBe('indonesia');
        expect(result.body.data.postalCode).toBe('234567');
    });

    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
                .get(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
                .set('Authorization','Token');

        expect(result.status).toBe(404);
    });

    it('should reject if address is not found', async () => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
                .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
                .set('Authorization','Token');

        expect(result.status).toBe(404);
    });
});

describe('PUT /api/contacts/:contactId/addresses/:addressId', function(){
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    });
    afterEach(async () => {
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can update address', async () => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
                .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
                .set('Authorization','Token')
                .send({
                    street: 'street',
                    city: 'city',
                    province: 'province',
                    country: 'indonesia',
                    postalCode: '1111',
                });
        
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testAddress.id);
        expect(result.body.data.street).toBe('street');
        expect(result.body.data.city).toBe('city');
        expect(result.body.data.province).toBe('province');
        expect(result.body.data.country).toBe('indonesia');
        expect(result.body.data.postalCode).toBe('1111');
    });

    it('should reject if request is not valid', async () => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
                .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
                .set('Authorization','Token')
                .send({
                    street: 'street',
                    city: 'city',
                    province: 'province',
                    country: '',
                    postalCode: '',
                });
        
        expect(result.status).toBe(400);
    });

    it('should reject if address is not found', async () => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
                .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
                .set('Authorization','Token')
                .send({
                    street: 'street',
                    city: 'city',
                    province: 'province',
                    country: 'indonesia',
                    postalCode: '1111',
                });
        
        expect(result.status).toBe(404);
    });

    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact();
        const testAddress = await getTestAddress();

        const result = await supertest(web)
                .put(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
                .set('Authorization','Token')
                .send({
                    street: 'street',
                    city: 'city',
                    province: 'province',
                    country: 'indonesia',
                    postalCode: '1111',
                });
        
        expect(result.status).toBe(404);
    });
});

describe('DELETE /api/contacts/:contactId/addresses/:addressId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    });
    afterEach(async () => {
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can remove address', async () => {
        const testContact = await getTestContact();
        let testAddress = await getTestAddress();

        const result = await supertest(web)
                .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
                .set('Authorization','Token');

        expect(result.status).toBe(200)
        expect(result.body.data).toBe('OK');

        testAddress = await getTestAddress();

        expect(testAddress).toBeNull();
    });
    it('should reject if address is not found', async () => {
        const testContact = await getTestContact();
        let testAddress = await getTestAddress();

        const result = await supertest(web)
                .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
                .set('Authorization','Token');

        expect(result.status).toBe(404);
    });

    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact();
        let testAddress = await getTestAddress();

        const result = await supertest(web)
                .delete(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
                .set('Authorization','Token');

        expect(result.status).toBe(404);
    });
});

describe('GET /api/contacts/:contactId/addresses', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    });
    afterEach(async () => {
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can list address', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
                .get(`/api/contacts/${testContact.id}/addresses`)
                .set('Authorization','Token');

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(1);
    });

    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
                .get(`/api/contacts/${testContact.id + 1}/addresses`)
                .set('Authorization','Token');

        expect(result.status).toBe(404);
    });
});