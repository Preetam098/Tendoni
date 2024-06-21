export interface productVariantInformation {
  id: string;
  variantName: string;
  status: string;
  isNew: boolean;
}

export interface productVariantInformationUpdate {
    id: string;
    isNew: boolean;
    status: string;
    variantName: string;
    interfacwe?: string; // Add any other optional properties
}