import styled from "styled-components";

const GreeterContainer = styled.div`
  padding: 2rem 0;
`;

const GreetText = styled.h1`
  font-weight: 900;
  font-size: 3rem;
  margin: 0.5rem 0;
  color: ${(props) => props.theme.mainColor};
`;

const DateText = styled.h3`
  font-weight: 400;
  font-size: 1rem;
  text-transform: uppercase;
  margin: 0;
  color: ${(props) => props.theme.accentColor};
`;

export interface IGreeterComponentProps {
  greeter?: IGreeterDataProps;
}

export interface IGreeterDataProps {
  greeter: IGreeterProps;
}

export interface IGreeterProps {
  months: Array<string>;
  days: Array<string>;
  greetings: Array<IGreetingProps>;
  dateformat: string;
}

interface IGreetingProps {
  greeting: string;
  start: number;
  end: number;
}

/**
 * Checks if a number is between two numbers
 * @param {number} a number that's supposed to be checked
 * @param {number} b minimum
 * @param {number} c maximum
 */
export const isBetween = (a: number, b: number, c: number): boolean =>
  a >= b && a <= c;

/**
 * Returns a greeting based on the current time
 * @param {Array<IGreetingProps>} greetings a list of greetings with start and end date
 * @returns {string} a greeting
 */
export const getGreeting = (greetings: Array<IGreetingProps>): string => {
  const hours = Math.floor(new Date().getHours());
  let result = "";

  greetings.forEach((greeting) => {
    if (isBetween(hours, greeting.start, greeting.end))
      result = greeting.greeting;
  });

  return result;
};

/**
 * Returns the appropriate extension for a number (eg. 'rd' for '3' to make '3rd')
 * @param {number} day number of a day within a month
 * @returns {string} extension for that number
 */
export const getExtension = (day: number) => {
  let extension = "th";

  if (day % 10 === 1 && day !== 11) {
    extension = "st";
  } else if (day % 10 === 2 && day !== 12) {
    extension = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    extension = "rd";
  }

  return extension;
};

/**
 * Generates the current date
 * @param {string} format format of the date string
 * @returns {string} current date as a string
 */
export const getDateString = (
  weekdays: Array<string>,
  months: Array<string>,
  format: string,
  date?: Date,
) => {
  const currentDate = date ? date : new Date();

  const weekday = weekdays[currentDate.getDay()];
  const day = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const extension = getExtension(day);
  const year = currentDate.getFullYear();
  const isodate = currentDate.toISOString().slice(0, 10);

  return format
    .replace("%wd", weekday)
    .replace("%d", day.toString())
    .replace("%e", extension)
    .replace("%m", month)
    .replace("%y", year.toString())
    .replace("%isodate", isodate);
};

/**
 * Renders the Greeter
 * @param {IGreeterComponentProps} data required greeter data
 * @returns {React.ReactNode} the greeter
 */
const Greeter = ({ greeter }: IGreeterComponentProps) => {
  if (greeter === undefined) return <></>;

  return (
    <GreeterContainer>
      <DateText>
        {getDateString(
          greeter.greeter.days,
          greeter.greeter.months,
          greeter.greeter.dateformat,
        )}
      </DateText>
      <GreetText>{getGreeting(greeter.greeter.greetings)}</GreetText>
    </GreeterContainer>
  );
};

export default Greeter;
