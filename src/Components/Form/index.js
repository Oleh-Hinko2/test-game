import React from "react";
import { Formik, Form, Field  } from 'formik';
import * as Yup from "yup";
import { connect } from 'react-redux';

import { Tooltip } from 'antd';

import { setSettings, toggleStatusGame } from "../../redux/settings";

const constants = {
  gameModePlaceholder: "Pick game mood",
  userFieldPlaceholder: "Enter your name",
  tooltipMessage: "Please finish game"
};

const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'The minimum length is two characters!')
    .required('Required'),
  gameMode: Yup.string()
    .required('Required'),
});

const options = [
  {
    id: 1,
    value: '',
    name: 'Pick game mood ..'
  },
  {
    id: 2,
    value: 'easyMode',
    name: 'Easy Mode'
  },
  {
    id: 3,
    value: 'normalMode',
    name: 'Normal Mode'
  },
  {
    id: 4,
    value: 'hardMode',
    name: 'Hard Mode'
  }
]

const FormDifficultyGame = ({ buttonStatus, toggleStatusGame, setSettings, startGame, allSettings }) => {

  const renderOptions = () => options.map(option => <option key={option.id} value={option.value}>{option.name}</option>)

  return (
    <Formik
      initialValues={{
        userName: "",
        gameMode: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        const { userName, gameMode } = values;
        toggleStatusGame();
        setSettings(allSettings[gameMode], userName);
      }}
    >
      {({ errors, touched }) => (
        <Form className="settings-game">
          <div className="settings-play__mode">
            <Field component="select" name="gameMode" placeholder={constants.gameModePlaceholder}>
              {renderOptions()}
            </Field>
            {errors.gameMode && touched.gameMode ? <div className="error">{errors.gameMode}</div> : null}
          </div>
          <div className="settings-play__name">
            <Field name="userName" placeholder={constants.userFieldPlaceholder}/>
            {errors.userName && touched.userName ? <div className="error">{errors.userName}</div> : null}
          </div>
          <div className="settings-play__submit">
            {startGame ? <Tooltip title={constants.tooltipMessage}>
              <button type="submit" disabled={startGame}>{buttonStatus === 'play' ? 'Play' : "Play again"}</button>
            </Tooltip> :
            <button type="submit" disabled={startGame}>{buttonStatus === 'play' ? 'Play' : "Play again"}</button>}
          </div>
        </Form >
      )}
    </Formik >
  );
};

const mapStateToProps = state => ({
  allSettings: state.settings.allSettings,
  startGame: state.settings.startGame,
  buttonStatus: state.settings.buttonStatus
})

const mapDispatchToProps = {
  setSettings,
  toggleStatusGame
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDifficultyGame);
