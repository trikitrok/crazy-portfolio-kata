import {Portfolio} from "../src/Portfolio";

describe("Portfolio", () => {
    it("lalala", () => {
       const portfolio = new Portfolio("test/portfolio.csv")
        portfolio.computePortfolioValue();
    });
});
