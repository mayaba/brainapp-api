import {Response } from 'express';

export interface IUser {
    user_id?: Number;
    name: String;
    username: String;
    email: String;
    joined_date: Date;
    score?: number;
}

export interface ILogin{
    login_id?: Number,
    username: String;
    password: string;
}

export interface IImgRes{
    response?: Response,
    score?: Number
}