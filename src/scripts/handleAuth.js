export async function handleAuth(code) {
  const response = await fetch(`/api/auth?code=${encodeURIComponent(code)}`);
  const data = await response.json();

  if (data.access_token) {
    localStorage.setItem("twitch_token", data.access_token);
    window.location.href = "/";
  } else {
    alert("Échec de l'authentification");
  }
}
