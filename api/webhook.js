import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Substitua pelos dados reais do seu Firebase Admin SDK
const serviceAccount = {
  "type": "service_account",
  "project_id": "SEU_PROJECT_ID",
  "private_key_id": "SEU_PRIVATE_KEY_ID",
  "private_key": "-----BEGIN PRIVATE KEY-----\\nSUA_CHAVE_AQUI\\n-----END PRIVATE KEY-----\\n",
  "client_email": "SEU_EMAIL@SEU_PROJETO.iam.gserviceaccount.com",
  "client_id": "SEU_CLIENT_ID"
};

const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Método não permitido");
  }

  const { ativo, tipo, horario, imagem } = req.body;

  if (!ativo || !tipo || !horario) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  try {
    await db.collection("sinais").add({
      ativo,
      tipo,
      horario: new Date(horario),
      imagem: imagem || ""
    });
    res.status(200).json({ message: "Sinal registrado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar no Firestore" });
  }
}
