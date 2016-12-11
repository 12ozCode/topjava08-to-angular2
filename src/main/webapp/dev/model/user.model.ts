/**
 * Created by Dreval Viacheslav on 10.12.2016.
 */
export interface UserModel {

    id: number;
    name: string;
    email: string;
    password: string;
    enabled: boolean;
    roles: string[];
    caloriesPerDay: number;
    registered: string;
}