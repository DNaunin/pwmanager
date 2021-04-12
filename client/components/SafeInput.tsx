import styled from "styled-components";
/**
 * Exercise
 * Change the background-color of the input based
 * on the length of the password
 * At a length of 0-4 it should be a red to orange
 * At a length of around 10 it should become green
 * It should never become blue, so stop at green
 */
type Props = {
  value: string;
};

function calcColor(length: number): string {
  return `hsl(${Math.min(length * 12, 120)},100%,50%)`;
}

// function calcColor(length: number): string {
//   const hWert = length * 12;
//   const newHSL = `HSL(${hWert}, 100%, 25%)`;

//   if (length === 0) {
//     return "HSL(0, 100%, 50%)";
//   }
//   if (length >= 12) {
//     return "hsl(120,100%,50%)";
//   } else {
//     return newHSL;
//   }
// }
const SafeInput = styled.input<Props>`
  background: ${(props) => calcColor(props.value.length)};
  border-radius: 15px;
  border: none;
`;
export default SafeInput;
