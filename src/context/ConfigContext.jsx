import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../api/apiClient";

const ConfigContext = createContext(null);

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await apiClient.fetchConfiguration();
        setConfig(data);
      } catch (error) {
        console.error("Failed to load store configuration", error);
      } finally {
        setLoading(false);
      }
    };
    loadConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
