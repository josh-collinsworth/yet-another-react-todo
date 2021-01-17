import Styled from 'styled-components'

const ButtonBarContainer = Styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
`

const ButtonBar = (props: { 
  allAreChecked: boolean, 
  checkOrUncheckAll: (e: React.FormEvent<HTMLButtonElement>) => void, 
  deleteAll: (e: React.FormEvent<HTMLButtonElement>) => void,
  deleteChecked: (e: React.FormEvent<HTMLButtonElement>) => void
}) => {
  return (
    <ButtonBarContainer>
        <button onClick={props.checkOrUncheckAll}>
          {props.allAreChecked ? 'Uncheck' : 'Check'} all
        </button>

        <button onClick={props.deleteChecked}>
          Delete Checked
        </button>

        <button onClick={props.deleteAll}>
          Delete all
        </button>
    </ButtonBarContainer>
  )
}

export default ButtonBar