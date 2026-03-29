"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortDocumentsByStatusAndDate = exports.deleteDocumentById = exports.updateDocumentById = exports.createDocument = exports.getDocumentById = exports.getAllDocuments = void 0;
const getAllDocuments = (model) => __awaiter(void 0, void 0, void 0, function* () {
    return model.find().exec();
});
exports.getAllDocuments = getAllDocuments;
const getDocumentById = (model, id) => __awaiter(void 0, void 0, void 0, function* () {
    return model.findById(id).exec();
});
exports.getDocumentById = getDocumentById;
const createDocument = (model, data) => __awaiter(void 0, void 0, void 0, function* () {
    const document = new model(data);
    return document.save();
});
exports.createDocument = createDocument;
const updateDocumentById = (model, id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return model.findByIdAndUpdate({ _id: id }, updateData, { new: true }).exec();
});
exports.updateDocumentById = updateDocumentById;
const deleteDocumentById = (model, id) => __awaiter(void 0, void 0, void 0, function* () {
    return model.findByIdAndRemove(id).exec();
});
exports.deleteDocumentById = deleteDocumentById;
const sortDocumentsByStatusAndDate = (documents) => {
    return [...documents].sort((a, b) => {
        if (a.status !== b.status) {
            return a.status ? 1 : -1;
        }
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
    });
};
exports.sortDocumentsByStatusAndDate = sortDocumentsByStatusAndDate;
