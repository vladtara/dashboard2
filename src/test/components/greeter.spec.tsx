import { render } from "@testing-library/react";
import Greeter, {
  IGreeterProps,
  isBetween,
  getExtension,
  getDateString,
} from "../../components/greeter";

const props: IGreeterProps = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  greetings: [
    {
      greeting: "Good night!",
      start: 0,
      end: 6,
    },
    {
      greeting: "Good morning!",
      start: 6,
      end: 12,
    },
    {
      greeting: "Good afternoon!",
      start: 12,
      end: 18,
    },
    {
      greeting: "Good evening!",
      start: 18,
      end: 24,
    },
  ],
  dateformat: "%wd, %m %d%e %y",
};

it("isBetween test", () => {
  expect(isBetween(5, 1, 3)).toBeFalsy;
  expect(isBetween(64, 1, 8)).toBeFalsy;
  expect(isBetween(-1, -5, -3)).toBeFalsy;
  expect(isBetween(4, 4, 4)).toBeTruthy;
  expect(isBetween(3, 1, 8)).toBeTruthy;
  expect(isBetween(-3, -5, -1)).toBeTruthy;
});

it("getExtension test", () => {
  expect(getExtension(0)).toEqual("th");
  expect(getExtension(1)).toEqual("st");
  expect(getExtension(2)).toEqual("nd");
  expect(getExtension(3)).toEqual("rd");
  expect(getExtension(4)).toEqual("th");
  expect(getExtension(5)).toEqual("th");
  expect(getExtension(6)).toEqual("th");
  expect(getExtension(7)).toEqual("th");
  expect(getExtension(8)).toEqual("th");
  expect(getExtension(9)).toEqual("th");
  expect(getExtension(10)).toEqual("th");
  expect(getExtension(11)).toEqual("th");
  expect(getExtension(12)).toEqual("th");
  expect(getExtension(13)).toEqual("th");
  expect(getExtension(14)).toEqual("th");
  expect(getExtension(15)).toEqual("th");
  expect(getExtension(16)).toEqual("th");
  expect(getExtension(17)).toEqual("th");
  expect(getExtension(18)).toEqual("th");
  expect(getExtension(19)).toEqual("th");
  expect(getExtension(20)).toEqual("th");
  expect(getExtension(21)).toEqual("st");
  expect(getExtension(22)).toEqual("nd");
  expect(getExtension(23)).toEqual("rd");
  expect(getExtension(24)).toEqual("th");
  expect(getExtension(25)).toEqual("th");
  expect(getExtension(26)).toEqual("th");
  expect(getExtension(27)).toEqual("th");
  expect(getExtension(28)).toEqual("th");
  expect(getExtension(29)).toEqual("th");
  expect(getExtension(30)).toEqual("th");
  expect(getExtension(31)).toEqual("st");
});

it("getDateString Test", () => {
  let dates: Date[] = [
    new Date("2022-04-04T00:00:00"),
    new Date("2022-04-05T00:00:00"),
    new Date("2022-04-06T00:00:00"),
    new Date("2022-04-07T00:00:00"),
    new Date("2022-04-08T00:00:00"),
    new Date("2022-04-09T00:00:00"),
    new Date("2022-04-10T00:00:00"),
  ];

  let results: string[] = [
    "Monday, April 4th 2022",
    "Tuesday, April 5th 2022",
    "Wednesday, April 6th 2022",
    "Thursday, April 7th 2022",
    "Friday, April 8th 2022",
    "Saturday, April 9th 2022",
    "Sunday, April 10th 2022",
  ];

  for (var i = 0; i < dates.length; i++) {
    expect(
      getDateString(props.days, props.months, props.dateformat, dates[i]),
    ).toEqual(results[i]);
  }
});

it("Greeter snapshot test without properties", () => {
  const { baseElement } = render(<Greeter />);
  expect(baseElement).toMatchSnapshot();
});
