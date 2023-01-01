/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { get } from "../services/posts";
import { KafkaClient } from "../services/kafkaclient";

// getting all posts
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //   get some posts
    const result = await get();
    return res.status(200).send({
      message: result,
    });
  } catch (error) {
    throw error;
  }
};

export const getTopics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //   get some posts
    const lib = new KafkaClient();
    const topics = await lib.listTopics();
    return res.status(200).send({
      message: topics,
    });
  } catch (error) {
    throw error;
  }
};

export const getTopicOffsets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topic: string = req.params.topic;
    if (!topic) {
      res.status(400).send({
        message: "Bad Request",
      });
    }
    const lib = new KafkaClient();
    const offsetdata = await lib.topicOffsets(topic);
    res.status(200).send({
      data: offsetdata,
    });
  } catch (error) {
    res.status(500).send({
      messsage: error,
    });
  }
};

export const produceToTopic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    const topicName: string = body.topic;
    const message = body.message;
    if (!topicName || !message) {
      return res.status(400).send({
        message: "Bad Request",
      });
    } else {
      const client = new KafkaClient();
      const details = await client.produce(topicName, message);
      return res.status(201).send({
        data: details,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};
