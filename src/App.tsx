import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, setupIonicReact, IonAlert } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import  React, {useRef, useState } from 'react';
import BmiResult from './components/BmiResult';
import BmiControls from './components/BmiControls';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import InputControls from './components/InputControls';



setupIonicReact();

const App: React.FC = () => {
  const [ calculatedBmi, setCalculated] = useState<number>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<'mkg' | 'ftlbs'>('mkg');

  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculate = () => {
    const enteredHeight= heightInputRef.current!.value;
    const enteredWeight = weightInputRef.current!.value;
  
    
    if(!enteredHeight || !enteredWeight || +enteredWeight <= 0 || +enteredHeight <= 0){
      setError('Introduza um valor maior que 0.');
      return;
    }

    const weightConversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1 ;
    const heightConversionFactor = calcUnits === 'ftlbs' ? 3.28 : 1;

    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;

    const bmi = +enteredWeight / (+enteredHeight* +enteredHeight);

    setCalculated(bmi)
  };

  const reset = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
  };

  const clearError = () => {
    setError('');
  };

  const selectCalcUnitHandler = (selectedValue: 'mkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  };


return(
  <React.Fragment>
    <IonAlert isOpen={!!error} message={error} buttons={[{text: 'OKay', handler: clearError}]}    
    />
    <IonApp>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonTitle >
            BMI Calculator
          </IonTitle>
        </IonToolbar> 
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <InputControls 
                selectedValue={calcUnits}
                onSelectValue={selectCalcUnitHandler}/>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
            <IonItem>
              <IonLabel position="floating">
                Your Height ({calcUnits === 'mkg' ? 'meters' : 'feet'})
              </IonLabel>
              <IonInput type="number" ref={heightInputRef}></IonInput>
            </IonItem> 
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
            <IonItem>
              <IonLabel position="floating">
                Yout Weight ({calcUnits === 'mkg' ? 'kg' : 'lbs'})
              </IonLabel>
              <IonInput type="number" ref={weightInputRef}></IonInput>
            </IonItem> 
            </IonCol>
          </IonRow>
      
        <BmiControls onCalculate= {calculate} onReset={reset} />
          {calculatedBmi && (
            <BmiResult result={calculatedBmi} />
          )}

        </IonGrid>
      </IonContent>
    </IonApp>
  </React.Fragment>
);
};

export default App;
