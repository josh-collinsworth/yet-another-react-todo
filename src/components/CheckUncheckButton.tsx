import Styled from 'styled-components'

const CheckBtn = Styled.button`
  border: none;
  background: transparent;
  padding: 0;
  font-size: 1rem;
`

const CheckUncheckButton = (props: {
  checkOrUncheckAll: (e: React.FormEvent<HTMLButtonElement>) => void,
  allAreChecked: boolean,
}) => {

  return (
    <CheckBtn onClick={(e) => props.checkOrUncheckAll(e)}>
      <span aria-hidden="true">{ props.allAreChecked ? '✅' : '⬜' }</span>
      <span className="sr">{ props.allAreChecked ? 'Uncheck' : 'Check' } all</span>
    </CheckBtn>
  )
}

export default CheckUncheckButton