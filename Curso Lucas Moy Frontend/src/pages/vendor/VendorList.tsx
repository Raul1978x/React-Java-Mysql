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
import { removeVendor, saveVendor, searchVendors } from "./VendorApi";
import Vendor from "./Vendor";

const VendorList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [proveedores, setProveedores] = useState<Vendor[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = () => {
    let result = searchVendors();
    setProveedores(result);
  };

  const remove = (id: string) => {
    removeVendor(id);
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
  //   saveVendor(ejemplo);
  // };

  const addVendor = () => {
    history.push("/page/vendor/new");
  };
  const editVendor = (id: string) => {
    history.push("/page/vendor/" + id);
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
          <IonTitle> Gestión de Proveedores </IonTitle>

          <IonItem>
            <IonButton
              color="primary"
              fill="outline"
              slot="end"
              size="default"
              onClick={addVendor}
            >
              <IonIcon icon={add} />
              Agregar proveedor
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
            {proveedores.map((proveedor: Vendor) => (
              <IonRow>
                <IonCol>
                  {proveedor.firstname} {proveedor.lastname}
                </IonCol>
                <IonCol>{proveedor.email}</IonCol>
                <IonCol>{proveedor.phone}</IonCol>
                <IonCol>{proveedor.address}</IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => editVendor(String(proveedor.id))}
                    color="primary"
                    fill="clear"
                  >
                    <IonIcon icon={pencil} slot="icon-only" />
                  </IonButton>
                  <IonButton
                    color="danger"
                    fill="clear"
                    onClick={() => remove(String(proveedor.id))}
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

export default VendorList;
