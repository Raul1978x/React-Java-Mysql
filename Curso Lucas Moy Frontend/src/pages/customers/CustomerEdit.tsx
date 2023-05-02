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
  removeCustomer,
  saveCustomer,
  searchCustomerById,
  searchCustomers,
} from "./CustomerApi";
import Customer from "./Customer";

const CustomerEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>();

  const [customer, setCustomer] = useState<Customer>({});

  const history = useHistory();
  useEffect(() => {
    search();
  }, []);

  const search = () => {
    if (id !== "new") {
      let result = searchCustomerById(id);
      setCustomer(result);
    }
    //   let result = searchCustomers();
    //   setClientes(result);
  };

  const save = () => {
    saveCustomer(customer);
    history.push("/page/customers");
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
            {id === "new" ? "Agregar Cliente" : "Editar Cliente"}{" "}
          </IonTitle>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput
                  onIonChange={(e) => (customer.firstname = String(e.detail.value))}
                  value={customer.firstname}
                  placeholder="Nombre"
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Apellido</IonLabel>
                <IonInput
                  onIonChange={(e) => (customer.lastname = String(e.detail.value))}
                  value={customer.lastname}
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
                  onIonChange={(e) => (customer.email = String(e.detail.value))}
                  value={customer.email}
                  placeholder="Email"
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Teléfono</IonLabel>
                <IonInput
                  onIonChange={(e) => (customer.phone = String(e.detail.value))}
                  value={customer.phone}
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
                  onIonChange={(e) => (customer.address = String(e.detail.value))}
                  value={customer.address}
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

export default CustomerEdit;
