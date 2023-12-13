import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: 'mrglxor'
        }
    });
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: 'mrglxor',
            password: await bcrypt.hash('rahasia',10),
            name: 'Mr Glx Or',
            token: 'Token'
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: 'mrglxor'
        }
    });
}

export const removeAllTestContacts = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: 'mrglxor'
        }
    });
}

export const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: 'mrglxor',
            firstName: 'test',
            lastName: 'test',
            email: 'test@hans.com',
            phone: '080912345'
        }
    })
}

export const createManyTestContact = async () => {
    for(let i = 0;i < 15; i++){
        await prismaClient.contact.create({
            data: {
                username: `mrglxor`,
                firstName: `test ${i}`,
                lastName: `scing ${i}`,
                email: `test${i}@hans.com`,
                phone: `080912345${i}`
            }
        })
    }
}

export const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: 'mrglxor'
        }
    })
}

export const removeAllTestAddresses = async () => {
    await prismaClient.address.deleteMany({
        where: {
            contact: {
                username: 'mrglxor'
            }
        }
    });
}

export const createTestAddress = async () => {
    const contact = await getTestContact();
    await prismaClient.address.create({
        data : {
            contactId: contact.id,
            street: 'jalan test',
            city: 'kota test',
            province: 'provinsi test',
            country: 'indonesia',
            postalCode: '234567',
        }
    });
}

export const getTestAddress = async () => {
    return prismaClient.address.findFirst({
        where: {
            contact: {
                username: 'mrglxor'
            }
        }
    })
}