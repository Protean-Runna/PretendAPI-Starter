import mongoose, {get } from "mongoose";
import {mockSchema} from "../Model/mockModel.js";
// This serves as a template for an api connected to a mongodb database
// All the controllers for CRUD ACTIONS go here

const mockItem = mongoose.model("MockItem", mockSchema);

function genericErrorMSG(req, res, error, mes) {
    res.status(500).json({message: `${req.method} REQUEST failed. ${mes}`, error})
    
};


export const getAll = async (req, res ) => {
    try {
        const data = await mockItem.find();
        if (!data || data.length === 0) {
            return res.status(404).json({message: "No data found"})
        }
        res.status(200).json(data);
    } catch (error) {
        genericErrorMSG(req, res, error, "Failed to fetch all data");
    }
    
};

export const getSingle = async (req, res ) => {
    try {
        const {id} = req.params;
        const data = await mockItem.findById(id);
        if (!data) {
            return res.status(404).json({message: `${data} couldn't be found`})
        }
        res.status(200).json(data);
    } catch (error) {
        if (error.name === "CastError") {
            res.status(400).json({ message: `Invalid ID` });
        }
        genericErrorMSG(req, res, error, "Failed to fetch this data");
    }
    
};



export const addMock = async (req, res) => {
  try {
    const newMock = new mockItem(req.body);
    const save = await newMock.save();
    res.status(201).json(save);
  } catch (error) {
    genericErrorMSG(req, res, error, "Failed to create mock data");
  }
};

export const updateMock = async (req, res) => {
  try {
    const { ID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(ID)){
        return res.status(400).json({message: "Invalid ID"})
    }
    const { Content_Mocker} = req.body;

    // for validating the required fields
    if(
      typeof Content_Mocker !== 'string'
      ){
      return res.status(400).json({message: 'content required'})
  }
    const updatedData = await mockItem.findByIdAndUpdate(
      ID,
      {
        Content_Mocker: Content_Mocker.trim(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: `${ID} is not found` });
    }

    res.status(201).json(updatedData);
  } catch (error) {
    genericErrorMSG(req, res, error, `failed to update ${ID}.`);
  }
};

//for deleting a user
export const deleteMock = async (req, res) => {
  try {
    const { ID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(ID)){
        return res.status(400).json({message: "Invalid ID"})
    }
    const deletedMock = await mockItem.findByIdAndDelete(ID);

    if (!deletedMock) {
      return res.status(404).json({ message: `${ID} was not found.` });
    }

    res.status(202).json({ message: `${ID} has been deleted.` });
  } catch (error) {
    genericErrorMSG(req, res, error, `failed to delete ${ID}`);
  }
};



module.exports ={
    getAll,
    getSingle,
    addMock,
    updateMock,
    deleteMock
};