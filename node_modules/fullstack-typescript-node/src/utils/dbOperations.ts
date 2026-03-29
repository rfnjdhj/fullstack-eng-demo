import { Document, Model, UpdateQuery } from 'mongoose';

export const getAllDocuments = async <T extends Document>(model: Model<T>): Promise<T[]> => {
  return model.find().exec();
};

export const getDocumentById = async <T extends Document>(
  model: Model<T>,
  id: string
): Promise<T | null> => {
  return model.findById(id).exec();
};

export const createDocument = async <T extends Document>(
  model: Model<T>,
  data: Partial<T>
): Promise<T> => {
  const document = new model(data);
  return document.save();
};

export const updateDocumentById = async <T extends Document>(
  model: Model<T>,
  id: string,
  updateData: UpdateQuery<T>
): Promise<T | null> => {
  return model.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

export const deleteDocumentById = async <T extends Document>(
  model: Model<T>,
  id: string
): Promise<T | null> => {
  return model.findByIdAndRemove(id).exec();
};

interface ISortableItem {
  status?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export const sortDocumentsByStatusAndDate = <T extends ISortableItem>(documents: T[]): T[] => {
  return [...documents].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status ? 1 : -1;
    }
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });
};
