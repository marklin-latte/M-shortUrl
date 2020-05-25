const server = require('../../server');
const supertest = require("supertest");
const chai = require("chai");
chai.should();

describe("Shorten Url Spec test", () => {
    let request;
    let _server;
    before(() => {
        _server = server.listen(3000);
        request = supertest(_server);
    });
    it("should get a shorten url and redirect to the origin url", async () => {
        const originUrl = "https://mark-lin.com/";
        const registerLongUrlRes = await request.post("/shortenUrls")
                                .send({ originUrl })
                                .set('Accept', "application/json");

        const {shortenUrl} = registerLongUrlRes.body;
        const shortenKey = shortenUrl.split("/")[2];
        const getOriginRes = await request.get(`/shortenUrls/${shortenKey}`);

        getOriginRes.status.should.equal(302);
        getOriginRes.header["location"].should.equal(originUrl);
    });
    it("should get 404 http status, when the shorten url is not find", async () => {
        const unvaildShortenKey = "abc";
        const getOriginRes = await request.get(`/shortenUrls/${unvaildShortenKey}`);

        getOriginRes.status.should.equal(404);
    });
    it('should get 400 http code, when register a invalid long url', async () => {
        const invalidUrl = "abcdefg";
        const registerLongUrlRes = await request.post("/shortenUrls")
                                .send({ invalidUrl })
                                .set('Accept', "application/json");

        registerLongUrlRes.status.should.equal(400);
    });
    after(async () => {
        await _server.close();
    });
});