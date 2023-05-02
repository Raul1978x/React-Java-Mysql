import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import { add, close, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import { removeEmployee, saveEmployee, searchEmployees } from "./EmployeeApi";
import Employee from "./Employee";

const EmployeeList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [empleados, setEmpleados] = useState<Employee[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = () => {
    let result = searchEmployees();
    setEmpleados(result);
  };

  const remove = (id: string) => {
    removeEmployee(id);
    search();
  };

  //Funcion para cargar en la localstorage

  // const pruebaLocalStorage = () => {
  //   const ejemplo = {
  //     id: 1,
  //     firstname: "Raul",
  //     lastname: "Gomez",
  //     email: "raul@gomez.com",
  //     phone: "456789123",
  //     address: "Av Siempre Vivas 123",
  //   };
  //   saveEmployee(ejemplo);
  // };

  const addEmployee = () => {
    history.push("/page/employee/new");
  };
  const editEmployee = (id: string) => {
    history.push("/page/employee/" + id);
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
          <IonTitle> Gestión de Empleados </IonTitle>

          <IonItem>
            <IonButton
              color="primary"
              fill="outline"
              slot="end"
              size="default"
              onClick={addEmployee}
            >
              <IonIcon icon={add} />
              Agregar empleado
            </IonButton>
          </IonItem>
          <IonGrid className="table">
            <IonRow>
              <IonCol>Nombre</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Teléfono</IonCol>
              <IonCol>Dirección</IonCol>
              <IonCol>acciones</IonCol>
            </IonRow>
            {empleados.map((empleado: Employee) => (
              <IonRow>
                <IonCol>
                  {empleado.firstname} {empleado.lastname}
                </IonCol>
                <IonCol>{empleado.email}</IonCol>
                <IonCol>{empleado.phone}</IonCol>
                <IonCol>{empleado.address}</IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => editEmployee(String(empleado.id))}
                    color="primary"
                    fill="clear"
                  >
                    <IonIcon icon={pencil} slot="icon-only" />
                  </IonButton>
                  <IonButton
                    color="danger"
                    fill="clear"
                    onClick={() => remove(String(empleado.id))}
                  >
                    <IonIcon icon={close} slot="icon-only" />
                  </IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonCard>

        {/* Boton para cargar en la localStorage */}

        {/* <IonButton onClick={pruebaLocalStorage} color="danger" fill="clear">
          Prueba local Storage
        </IonButton> */}
      </IonContent>
    </IonPage>
  );
};

export default EmployeeList;
