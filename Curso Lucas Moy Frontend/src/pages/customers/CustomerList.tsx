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
import { removeCustomer, saveCustomer, searchCustomers } from "./CustomerApi";
import Customer from "./Customer";

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [clientes, setClientes] = useState<Customer[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = () => {
    let result = searchCustomers();
    setClientes(result);
  };

  const remove = (id: string) => {
    removeCustomer(id);
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
  //   saveCustomer(ejemplo);
  // };

  const addCustomer = () => {
    history.push("/page/customer/new");
  };
  const editCustomer = (id: string) => {
    history.push("/page/customer/" + id);
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
          <IonTitle> Gestión de Clientes </IonTitle>

          <IonItem>
            <IonButton
              color="primary"
              fill="outline"
              slot="end"
              size="default"
              onClick={addCustomer}
            >
              <IonIcon icon={add} />
              Agregar cliente
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
            {clientes.map((cliente: Customer) => (
              <IonRow>
                <IonCol>
                  {cliente.firstname} {cliente.lastname}
                </IonCol>
                <IonCol>{cliente.email}</IonCol>
                <IonCol>{cliente.phone}</IonCol>
                <IonCol>{cliente.address}</IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => editCustomer(String(cliente.id))}
                    color="primary"
                    fill="clear"
                  >
                    <IonIcon icon={pencil} slot="icon-only" />
                  </IonButton>
                  <IonButton
                    color="danger"
                    fill="clear"
                    onClick={() => remove(String(cliente.id))}
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

export default CustomerList;
