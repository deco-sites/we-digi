import { useEffect, useState } from "preact/hooks";

const ContactForm = () => {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [interest, setInterest] = useState('');
    const [role, setRole] = useState('');  // Novo estado para o select
    const [showMessage, setShowMessage] = useState(false);
    const [sucess, setSuccess] = useState(false)
    // const [message, setMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');


    const sendForm = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const templateParams = {
            from_name: `${name} ${lastname}`,
            email: email,
            phone: phone,
            role: role,
            interest: interest,
            message: emailMessage,
            reply_to: "felipe.trudes@wedigi.com.br",
        };

        // @ts-ignore
        window.emailjs.send("service_afu9xae", "template_ym3xf4c", templateParams, "2vZSz2HddmGzCG-4Y")
            .then(() => {
                setName('');
                setLastName('');
                setEmail('');
                setPhone('');
                setRole('');
                setEmailMessage('')
                setInterest('')
                setShowMessage(true);
                setSuccess(true)

            }, () => {
                setShowMessage(true);
                setSuccess(false)
            });
    };

    const closeMessage = () => {
        // setMessage('');
        setShowMessage(false);
    };

    useEffect(()=>{
        if(showMessage){
            setTimeout(()=>{
                setShowMessage(false)
            }, 10000)
        }
    }, [showMessage])

    return (
        <>
            {!showMessage &&
                <form class="flex flex-col gap-[1.7rem] md:p-4 lg:p-0" onSubmit={sendForm}>
                {/* <!-- Nome e Sobrenome --> */}
                <div class="flex gap-4">
                    <input
                        type="text"
                        placeholder="Primeiro Nome*"
                        required
                        class="w-full input input-bordered border-[#4C4B4B]"
                        value={name}
                        onChange={(e) => setName((e.target as HTMLInputElement).value)}
                    />
                    <input
                        type="text"
                        placeholder="Sobrenome*"
                        required
                        value={lastname}
                        class="w-full input input-bordered border-[#4C4B4B]"
                        onChange={(e) => setLastName((e.target as HTMLInputElement).value)}
                    />
                </div>

                {/* <!-- E-mail Corporativo --> */}
                <input
                    type="email"
                    placeholder="E-mail corporativo*"
                    required
                    class="w-full input input-bordered border-[#4C4B4B]"
                    onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                    value={email}
                />

                {/* <!-- Telefone e Cargo --> */}
                <div class="flex gap-4">
                    <input
                        type="tel"
                        placeholder="Telefone*"
                        required
                        class="w-full input input-bordered border-[#4C4B4B]"
                        onChange={(e) => setPhone((e.target as HTMLInputElement).value)}
                        value={phone}
                    />
                    <select required class="w-full input input-bordered border-[#4C4B4B]" onChange={(e) => setRole((e.target as HTMLSelectElement).value)} value={role}>
                        <option value="" disabled selected>Cargo*</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Assistente">Assistente</option>
                        <option value="Analista">Analista</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>

                {/* <!-- Assunto de Interesse --> */}
                <input
                    type="text"
                    placeholder="Assunto de Interesse*"
                    required
                    class="w-full input input-bordered border-[#4C4B4B]"
                    onChange={(e) => setInterest((e.target as HTMLInputElement).value)}
                    value={interest}
                />

                {/* <!-- Mensagem --> */}
                <textarea
                    placeholder="Mensagem"
                    required
                    class="w-full input input-bordered border-[#4C4B4B] h-32 px-4 py-2 rounded-[10px] max-h-32"
                    onChange={(e) => setEmailMessage((e.target as HTMLInputElement).value)}
                    value={emailMessage}
                ></textarea>

                {/* <!-- Alerta --> */}
                <p class="text-sm md:text-xs text-white ">
                    Alerta de Golpe! Estão se passando pela nossa empresa oferecendo oportunidades de trabalho. Caso tenha recebido algum contato pelo WhatsApp, desconsidere, bloqueie e faça a denúncia do número.
                </p>

                {/* <!-- Botão de Enviar --> */}
                <button
                    type="submit"
                    class="btn btn-outline font-medium btn-primary text-base mt-4 lg:w-fit px-12 lg:ml-auto w-full"
                    aria-label="Enviar"
                >
                    ENVIAR →
                </button>
            </form>}

            {showMessage &&
                <div class="flex flex-col items-center">
                    <div class={`${sucess ? 'text-green-500' : 'text-red-500'} p-3 text-sm text-center font-bold`}>
                        {sucess &&
                            <>
                                <p class="text-xl">Obrigado!</p>
                                <p>Entraremos em contato o quanto antes</p>
                            </>
                        }
                        {!sucess &&
                            <>
                                <p class="text-xl">Desculpe!</p>
                                <p>Infelizmente tivemos um problema, tente novamente mais tarde</p>
                            </>
                        }
                    </div>
                    <button class={`${sucess ? 'bg-green-500' : 'bg-red-500'} rounded-[50px] py-3 px-9`}
                        onClick={closeMessage}>
                        OK
                    </button>
                </div>
            }
        </>
    )
}

export default ContactForm