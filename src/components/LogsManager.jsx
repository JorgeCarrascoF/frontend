import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { updateLog } from "../queries/updateLog";

export default function LogsManager() {
  const queryClient = useQueryClient();

  // Traer logs
  const {
    data: logs,
    isLoading,
    error,
  } = useQuery(["logs"], () => api.get("/logs").then((res) => res.data));

  // Mutación para actualizar log
  const mutation = useMutation(
    ({ id, updatedFields }) => updateLog(id, updatedFields),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["logs"]);
      },
    }
  );

  // Estados para editar
  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  // Comenzar edición
  function startEdit(log) {
    setEditingId(log.id);
    setEditMessage(log.message);
  }

  // Cancelar edición
  function cancelEdit() {
    setEditingId(null);
    setEditMessage("");
  }

  // Guardar edición
  function saveEdit() {
    mutation.mutate({ id: editingId, updatedFields: { message: editMessage } });
    cancelEdit();
  }

  if (isLoading) return <p>Cargando logs...</p>;
  if (error) return <p>Error cargando logs.</p>;

  return (
    <div style={{ width: "100%", marginTop: "2rem" }}>
      <h2>Logs</h2>
      <table
        border="1"
        cellPadding="5"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Mensaje</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>
                {editingId === log.id ? (
                  <input
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    style={{ width: "100%" }}
                  />
                ) : (
                  log.message
                )}
              </td>
              <td>
                {editingId === log.id ? (
                  <>
                    <button onClick={saveEdit} disabled={mutation.isLoading}>
                      Guardar
                    </button>
                    <button onClick={cancelEdit} disabled={mutation.isLoading}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button onClick={() => startEdit(log)}>Editar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mutation.isLoading && <p>Guardando cambios...</p>}
      {mutation.isError && <p>Error al guardar cambios.</p>}
    </div>
  );
}
