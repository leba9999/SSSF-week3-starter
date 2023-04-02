// TODO: create a controller to send the data of uploaded cat
// to the client
// data to send is described in UploadMessageResponse interface

import { NextFunction, Request, Response } from "express";
import UploadMessageResponse from "../../interfaces/UploadMessageResponse";
import { Cat } from "../../interfaces/Cat";
import catModel from "../models/catModel";
import { Point } from "geojson";
import CustomError from "../../classes/CustomError";

/*
const catPost = async (req: Request, res: Response) => {
    const cat: Cat = req.body;
    const catToSave = new catModel(cat);
    const savedCat = await catToSave.save();
    const response: UploadMessageResponse = {
        message: "Cat uploaded successfully",
        data: {
            filename: savedCat.filename,
            location: savedCat.location,
        },
    };
    res.status(200).json(response);
};
export {catPost};

*/
const catPost = async (
    req: Request<{}, {}, {}, {}, {coords: Point}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.file) {
        const err = new CustomError('file not valid', 400);
        throw err;
      }
      const response : UploadMessageResponse = {
        message: 'file uploaded',
        data: {
          filename: req.file.filename,
          location: res.locals.coords,
        },
      };
      res.json(response);
    } catch (error) {
      next(new CustomError((error as Error).message, 400));
    }
  };
  
  export {catPost};