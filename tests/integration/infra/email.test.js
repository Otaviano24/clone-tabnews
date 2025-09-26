import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});
describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "BootyNews <contato@bootynews.com>>",
      to: "contato@usuario.com",
      subject: "Test de assunto",
      text: "Tese de corpo.",
    });

    await email.send({
      from: "BootyNews <contato@bootynews.com>>",
      to: "contato@usuario.com",
      subject: "Último email enviado",
      text: "Corpo do último email.",
    });

    const lastEmail = await orchestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<contato@bootynews.com>");
    expect(lastEmail.recipients[0]).toBe("<contato@usuario.com>");
    expect(lastEmail.subject).toBe("Último email enviado");
    expect(lastEmail.text).toBe("Corpo do último email.\r\n");
  });
});
