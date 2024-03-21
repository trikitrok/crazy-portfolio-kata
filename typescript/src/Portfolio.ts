import {Asset, MeasurableValue, PricelessValue} from "./Asset";
import * as fs from "fs";

export class Portfolio {
  private readonly _portfolioCsvPath: string;

  constructor(portfolioCsvPath: string) {
    this._portfolioCsvPath = portfolioCsvPath;
  }

  computePortfolioValue(): void {
    const now = new Date();
    const readText = fs.readFileSync(this._portfolioCsvPath, {encoding: 'utf8'});
    const lines = readText.split(/\r?\n/);
    let portfolioValue = new MeasurableValue(0);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const columns = line.split(",");

      const [year, month, day] = columns[1].split("/");
      if ([year, month, day].some((value) => value === undefined)) {
        throw new Error("wrong date");
      }
      const date = new Date(Number(year), Number(month) - 1, Number(day));

      const asset = new Asset(columns[0], date,
        columns[0] == "Unicorn" ? new PricelessValue() : new MeasurableValue(Number(columns[2])));

      if (Math.floor((asset.getDate().getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) < 0) {
        if (asset.getDescription() != "French Wine") {
          if (asset.getDescription() != "Lottery Prediction") {
            if (asset.getValue().get() > 0) {
              if (asset.getDescription() != "Unicorn") {
                asset.setValue(new MeasurableValue(asset.getValue().get() - 20));
              } else {
                console.log(
                  "Portfolio is priceless because it got a unicorn on " +
                  asset.getDate() + "!!!!!");
                return;
              }
            }
          } else {
            asset.setValue(new MeasurableValue(asset.getValue().get() - asset.getValue().get()));
          }
        } else {
          if (asset.getValue().get() < 200) {
            asset.setValue(new MeasurableValue(asset.getValue().get() + 20));
          }
        }
      } else {
        if (asset.getDescription() != "French Wine" && asset.getDescription() != "Lottery Prediction") {
          if (asset.getValue().get() > 0.0) {
            if (asset.getDescription() != "Unicorn") {
              asset.setValue(new MeasurableValue(asset.getValue().get() - 10));
            } else {
              console.log("Portfolio is priceless because it got a unicorn on " + asset.getDate() + "!!!!!");
              return;
            }
          } else {
            if (asset.getDescription() == "Unicorn") {
              console.log("Portfolio is priceless because it got a unicorn on " + asset.getDate() + "!!!!!");
              return;
            }
          }
        } else {
          if (asset.getDescription() == "Lottery Prediction") {
            if (asset.getValue().get() < 800) {
              asset.setValue(new MeasurableValue(asset.getValue().get() + 5));

              if (Math.floor((asset.getDate().getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) < 11) {
                if (asset.getValue().get() < 800) {
                  asset.setValue(new MeasurableValue(asset.getValue().get() + 20));
                }
              }

              if (Math.floor((asset.getDate().getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) < 6) {
                if (asset.getValue().get() < 800) {
                  asset.setValue(new MeasurableValue(asset.getValue().get() + 100));
                }
              }
            }
          } else {
            if (asset.getValue().get() < 200) {
              asset.setValue(new MeasurableValue(asset.getValue().get() + 10));
            }
          }
        }
      }
      portfolioValue = new MeasurableValue(portfolioValue.get() + asset.getValue().get());
    }
    console.log(portfolioValue);
  }
}
