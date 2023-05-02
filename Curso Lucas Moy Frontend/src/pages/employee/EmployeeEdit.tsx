import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import { add, checkmark, close, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import {
  removeEmployee,
  saveEmployee,
  searchEmployeeById,
  searchEmployees,
} from "./EmployeeApi";
import Employee from "./Employee";

const EmployeeEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>();

  const [employee, setEmployee] = useState<Employee>({});

  const history = useHistory();
  useEffect(() => {
    search();
  }, []);

  const search = () => {
    if (id !== "new") {
      let result = searchEmployeeById(id);
      setEmployee(result);
    }
    //   let result = searchEmployees();
    //   setEmpleados(result);
  };

  const save = () => {
    saveEmployee(employee);
    history.push("/page/employees");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonTitle>
            {" "}
            {id === "new" ? "Agregar Empleado" : "Editar Empleado"}{" "}
          </IonTitle>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput
                  onIonChange={(e) =>
                    (employee.firstname = String(e.detail.value))
                  }
                  value={employee.firstname}
                  placeholder="Nombre"
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Apellido</IonLabel>
                <IonInput
                  onIonChange={(e) =>
                    (employee.lastname = String(e.detail.value))
                  }
                  value={employee.lastname}
                  placeholder="Apellido"
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  onIonChange={(e) => (employee.email = String(e.detail.value))}
                  value={employee.email}
                  placeholder="Email"
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Teléfono</IonLabel>
                <IonInput
                  onIonChange={(e) => (employee.phone = String(e.detail.value))}
                  value={employee.phone}
                  placeholder="Teléfono"
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Dirección</IonLabel>
                <IonInput
                  onIonChange={(e) =>
                    (employee.address = String(e.detail.value))
                  }
                  value={employee.address}
                  placeholder="Dirección"
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonItem>
            <IonButton
              onClick={save}
              color="success"
              // fill="outline"
              slot="end"
              size="default"
            >
              <IonIcon icon={checkmark} />
              Guardar
            </IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EmployeeEdit;
