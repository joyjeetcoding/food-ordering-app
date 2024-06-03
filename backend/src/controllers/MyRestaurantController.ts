import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.find({ user: req.userId });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User Restaurant already exists" });
    }

    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64"); //converted the image to base64
    const dataURI = `data: ${image.mimetype};base64,${base64Image}`; //mimetype means whether the image is png or jpg

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    const restaurant = new Restaurant(req.body); // creating new restaurant and we will not create more than 1 restaurant per userId
    restaurant.imageUrl = uploadResponse.url; //saving the mageUrl to cloudinary
    restaurant.user = new mongoose.Types.ObjectId(req.userId); //storing the user to restaurant.user
    restaurant.lastUpdate = new Date();
    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};



export default {
    createMyRestaurant,
}