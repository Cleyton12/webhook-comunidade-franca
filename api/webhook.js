import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = {
  "type": "service_account",
  "project_id": "projetinho-4e502",
  "private_key_id": "f98f0f889d5559ec8b486586ba3afe736df72f98",
  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC5SwK3ghotiBOO\\nJN/vsqu2sEL8IUokHw0zcgqCKLPYz3ihX4KPEkm4rcXGzLp24li339YziOxZhuK4\\nQdKpU8syxz3TpVTT6SuEumgCg5Q7MQsZOeODk285AwV4cRmM5IPF48qiwVgCs1QF\\njZ/iQ1U0AAaDlUW3icWdWCt/3229yAgpZCoCu8+dbk6haMzVral8oHkbvAN5n56A\\nh6DRVQg9m8LxZKhTHW3tfXoC70TulMmWLvqvbYJM2n3wD5QsHYjhm/0nucuxN1vg\\nFDbdr9DnPjTob8wzesJFYKJcFIbz/MEclmE+DoNLOTssd1P1fDzagUdhRHg10/ka\\ncUBoDtq5AgMBAAECggEAA+gJRPXQ4s2FSVriVGWvlGi/kMc24+9k/NpWTwuCodCF\\n74kER0s7E1H+jcQP2Ppz+l8VX1LEq4KE0cj5eFO+60bODoyOxETx2O4ry9nFoesq\\ncRFfsuIZ1y7cH6pAFVCqrTJcjvUv4NFdCnJDllFAa5nl3peit6Lc8AXwLNWjX6aI\\nVmSS4vSSOmytmLa/D3SPJXsnMVwmwudagaQSZMVnvGG1m1ysQeQObv/oQd8OU0pp\\nFxllBXtEYqB/cAdF9DzYTmfesL8+8imG4u8iHarHWfzBMIMM9qEMSoulQIlOkZQS\\nUYYnSxm9CBkUimWnO3zad46sTpa5jqrrsiuki6NCjQKBgQD7WfAoKZ4xls/Qefug\\nEesJA69JPMHt1jIcSQl7JFWONd6mY3C/pi0i1c+u9OIHEq6D7snebXoej+CWcr53\\nRZJPyCLIpNjNS+ZHRg9reFAnAZUEZLb8poUWemWvdPJtw5iAjqC0w8t+g4IzN+EA\\nLrI3KKwG+VmcEaKeZQtZts5ZewKBgQC8uE8lUxIoT1RQUP1t0ta2FNVkpLvuKazc\\ngzpzVrFwrpi8gK8dn7myt6OOE2285jNnKFL99LIh+3A6B0h4NmBiL5zyb58HJul/\\nfI4UjuWO82n5nwmhOjKVFA4xriXI2+hBP0ARaPZ43BNOtP/CrGa3/BsRHDE9lusQ\\nhDw0BvNkWwKBgGPV6mUZesM5otusx/xhgZi4BPSzFFhSvt6rR//Ig88TqJcwYkVN\\nTRpMEMzuaaTjj7vJqhcWJu5iuZMoimy3jpDv7pkBmTeaESJ4OoG2bSfBIh53npMl\\n1TEDdsZFTlG44icV/9Es//QFaj7L0CwRYCo2lnXCrwwlmREPE34T9UxnAoGAFDb5\\n41menErDEUdbniPzc9WPdhRfPQehyI0V+bzTjOpm2eo+18GANrCNCG70VkOiRe5/\\n1UwcuJ8iSlT1YksQz/OhsCZctntoj4tb/L/Bvyo7s81hTq/ZMzbOvmuVCIrlufd4\\neWTw4clRGCEzNDsbVaHflFmcvKgpzb8cY8ZK0/kCgYAxaWQZlVIFEj3IjbSmVOib\\n6KCWBPjQzeRRyeWkE+x6Dct4+gZHcQ9wOziq+DF++XLx3xh3tiIQV8ksiv2UZu2n\\n9hX3Y6k8Kmjt6b02Q+4qBVO3S0kyIrdDXA3qFu/BzIpvy5My+zDOP8LZ2VLosRp4\\nishzwhYkMiMlaeocJJZojg==\\n-----END PRIVATE KEY-----\\n",
  "client_email": "firebase-adminsdk-fbsvc@projetinho-4e502.iam.gserviceaccount.com",
  "client_id": "112156510759491846256",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40projetinho-4e502.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
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
