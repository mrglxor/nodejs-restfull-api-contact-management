import {prismaClient} from "../application/database.js";
import {getContactValidation} from "../validation/contact-validation.js";
import {validate} from "../validation/validation.js";
import {ResponseError} from "../error/response-error.js";
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/address-validation.js";

const checkContactMustExists = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId);

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    });

    if(totalContactInDatabase !== 1) {
        throw new ResponseError(404,'contact is not found');
    }

    return contactId;
}

const create = async (user, contactId, request) => {

    contactId = await checkContactMustExists(user,contactId);

    const address = validate(createAddressValidation,request);
    address.contactId = contactId;

    return prismaClient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postalCode: true
        }
    });
}

const get = async (user, contactId, addressId) => {
    contactId = await checkContactMustExists(user,contactId);
    addressId = validate(getAddressValidation, addressId);

    const address = await prismaClient.address.findFirst({
        where: {
            contactId: contactId,
            id: addressId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postalCode: true
        }
    });

    if(!address){
        throw new ResponseError(404,'address is not found');
    }

    return address;
}

const update = async (user, contactId, request) => {
    contactId = await checkContactMustExists(user, contactId);
    const address = validate(updateAddressValidation, request);

    const totalAddressInDatabase = await prismaClient.address.count({
        where: {
            contactId: contactId,
            id: address.id
        },
    });

    if(totalAddressInDatabase !== 1) {
        throw new ResponseError(404,'address is not found');
    }

    return prismaClient.address.update({
        where: {
            id: address.id,
        },
        data: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postalCode: address.postalCode,
        },
        select :{
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postalCode: true
        }
    });
}

const remove = async (user,contactId,addressId) => {
    contactId = await checkContactMustExists(user, contactId);
    addressId = validate(getAddressValidation, addressId);

    const totalAddressInDatabase = await prismaClient.address.count({
        where: {
            contactId: contactId,
            id: addressId
        },
    });

    if(totalAddressInDatabase !== 1) {
        throw new ResponseError(404,'address is not found');
    }

    return prismaClient.address.delete({
        where : {
            id: addressId
        }
    })
}

const list = async (user, contactId) => {
    contactId = await checkContactMustExists(user, contactId);

    return prismaClient.address.findMany({
        where: {
            contactId: contactId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postalCode: true
        }
    });
}

export default {
    create,
    get,
    update,
    remove,
    list
}