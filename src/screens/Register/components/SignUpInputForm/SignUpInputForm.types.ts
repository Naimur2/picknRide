const stat = {
    dialing_code: "+880",
    email: "naimur@gmail.com",
    f_name: "Naimur",
    l_name: "Rahaman",
    location_id: 1,
    password: "Na@12345678",
    phone: "1840307041",
};

export interface IRegisterProps {
    f_name: string;
    l_name: string;
    email: string;
    phone: string;
    dialing_code: string;
    location_id: number;
}
