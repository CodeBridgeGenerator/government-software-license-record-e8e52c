
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(""),
email: faker.lorem.sentence(""),
password: faker.lorem.sentence(""),

        };
        data = [...data, fake];
    }
    return data;
};
