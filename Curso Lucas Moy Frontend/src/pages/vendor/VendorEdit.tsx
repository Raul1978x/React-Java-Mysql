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
  removeVendor,
  saveVendor,
  searchVendorById,
  searchVendors,
} from "./VendorApi";
import Vendor from "./Vendor";

const VendorEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>();

  const [vendor, setVendor] = useState<Vendor>({});

  const history = useHistory();
  useEffect(() => {
    search();
  }, []);

  const search = () => {
    if (id !== "new") {
      let result = searchVendorById(id);
      setVendor(result);
    }
    //   let result = searchVendors();
    //   setProveedores(result);
  };

  const save = () => {
    saveVendor(vendor);
    history.push("/page/vendors");
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
            {id === "new" ? "Agregar Proveedor" : "Editar Proveedor"}{" "}
          </IonTitle>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput
                  onIonChange={(e) =>
                    (vendor.firstname = String(e.detail.value))
                  }
                  value={vendor.firstname}
                  placeholder="Nombre"
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Apellido</IonLabel>
                <IonInput
                  onIonChange={(e) =>
                    (vendor.lastname = String(e.detail.value))
                  }
                  value={vendor.lastname}
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
                  onIonChange={(e) => (vendor.email = String(e.detail.value))}
                  value={vendor.email}
                  placeholder="Email"
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Teléfono</IonLabel>
                <IonInput
                  onIonChange={(e) => (vendor.phone = String(e.detail.value))}
                  value={vendor.phone}
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
                    (vendor.address = String(e.detail.value))
                  }
                  value={vendor.address}
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

export default VendorEdit;
