import React from "react";

import { getDictionary } from "@/lib/i18n";
import type {Dictionary, Locale} from "@/types";

interface LocalDictionaryProps {
    locale: Locale;
    children: (dict: Dictionary) => React.ReactNode;
}

export default async function LocalDictionary({ locale, children }: LocalDictionaryProps) {
    // Hier erfolgt die asynchrone Datenabfrage
    const dict = await getDictionary(locale);

    // Die Kinderkomponenten erhalten die geladenen Daten
    return <>{children(dict)}</>;
}