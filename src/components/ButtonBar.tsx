import Styled from 'styled-components'

const ButtonBarContainer = Styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
`

const ButtonBar = (props: { 
  deleteAll: (e: React.FormEvent<HTMLButtonElement>) => void,
  deleteChecked: (e: React.FormEvent<HTMLButtonElement>) => void
}) => {
  
  return (
    <ButtonBarContainer>
        <button onClick={props.deleteChecked}>
          <span aria-hidden="true">✖️&ensp;</span> Delete Checked
        </button>

        <button onClick={props.deleteAll}>
          <span aria-hidden="true">⚠️&ensp;</span>
          Delete all
        </button>
    </ButtonBarContainer>
  )
}

export default ButtonBar