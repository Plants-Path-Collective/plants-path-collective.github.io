---
title: "Una pincelada de Historia, y otra de Progreso"
game: "Hunters: Fractura del Tiempo"
date: 2026-08-13
authors:
  - name: "Marchel"
    role: "Director de Proyecto, Programador, Diseñador y Guionista"
    avatar: "../assets/misc/avatars/marchel.gif"
  - name: "Ame"
    role: "Programadora, Diseñadora y Guionista"
    avatar: "../assets/misc/avatars/ame.gif"
background: "../assets/misc/backgrounds/generic-background1.webp"
excerpt: "Nuevos objetos, facciones renovadas y el plan de desarrollo."
social_image: "https://plants-path-collective.github.io/assets/projects/hunters-fracture/hunters-fracture_thumbnail.webp"
---

Antes de partir, queremos aclarar, que el contenido de los Devlogs en si es un poco desordenado, ya que la idea principal es contar un poco del avance, y en un futuro hacer una presentación formal del juego, es por ello que al principio, es normal sentirse un poco perdido(a), ya que no explicamos todo el contexto y sistemas del juego. Disfruten de la lectura o/

---

Esta semana Ame y mi persona, Marchel, nos reunimos para poder aclarar varios puntos a cambiar tras el fin de la prerpoducción, de esta manera, podremos empezar de manera clara con un prototipo.

---

## ¿Cómo funciona el progreso?

Tomando de referencia juegos como Risk of Rain y THe Binding of Isaac, en Hunters Fracture decidimos que el sistema de progresión, no estuviese basado en niveles como otros JRPGs, es por ello que mirando hacia al lado encontramos a los Roguelites como RoR u Isaac, juegos en los que el jugador juega partidas y obtiene items para potenciar a su personaje, sin embargo, perdiendo practicamente todo al perecer, pero pudiendo desbloquear ciertos personajes, skins o similares tras cada partida en base a ciertos logros conseguidos.

Para Hunters Fracture, decidimos que seria buena idea mantener el progreso o desbloqueo de items, que se añadirian a la pool, y skins o personajes que se añadirian tras desbloquear estos Desafíos como los nombramos; mientras que refiriendonos a los objetos, llegamos a definirlos en dos categorías: los consumibles, veanse pociones, buffs en formas de pociones, entre otros; mientras que por otro lado, estarían los pasivos, estos se asemejarían más a los objetos de Risk of Rain, donde el jugador puede obtenerlos y acumularlos prácticamente infinitamente, dandole esa satisfacción de romper el juego si así lo desea. Vale mencionar que algunos items afectaran a los personajes dependiendo de donde se ubican en el campo de batalla (Ej: este item le da un bono a un personaje a tu izquierda) Refiriendonos a estos últimos, queremos hablar de sus rarezas o tiers, los cuales serian los siguientes tres:

- **Comunes**: Pueden modificar las estadísticas, aplicar efectos al impactar y reducir el coste de SP de las habilidades.
- **Raros**: Pueden modificar comportamientos de ataques y habilidades de los personajes, también pueden aplicar cambios de estados, y buffs en general.
- **Únicos**: Cambian las reglas del combate, permiten cambiar estadísticas, como actuan los Aliados u Enemigos, entre otras cosas. A diferencia de los otros tiers, no pueden stackearse, debido a que solo existe 1 copia de cada objeto único en el mundo.

En total, la primera demo contaría con alrededor de **14** objetos, siendo estos: **2** únicos, **4** raros, y **8** comunes.

Aquí algunos de los que tenemos para calmar las ansias:

<div class="devlog-item-table">
  <div class="devlog-item-row devlog-item-header">
      <div>Objeto</div>
      <div>Rareza</div>
      <div>Historia</div>
      <div>Efecto</div>
  </div>

  <div class="devlog-item-row">
    <div class="devlog-item-name">Muñeca de Porcelana</div>
    <div>
        <span class="devlog-item-rarity common">Común</span>
    </div>
    <div class="devlog-item-lore">
        Una antigua muñeca de porcelana, heredada de generación en generación, observa silenciosamente el puesto, custodiando recuerdos familiares entre frutas y voces.
    </div>
    <div class="devlog-item-effect">
        Aumenta la fuerza del portador en un 25% (+10% por copia), disminuye la defensa física y la defensa mágica, del portador, en un 15% (+10% por copia).
  </div>
  </div>

  <div class="devlog-item-row">
    <div class="devlog-item-name">Reproductor de CD</div>
    <div>
        <span class="devlog-item-rarity rare">Raro</span>
    </div>
    <div class="devlog-item-lore">
        Reproductor de CD de segunda o tercera mano, ha sido usado durante tanto tiempo, que tiende a rayar los CDs que reproduce, rebobinandolos de vez en cuando.
    </div>
    <div class="devlog-item-effect">
        Al atacar o usar una habilidad, 10% (+5% por copia) de probabilidad de repetir el turno del portador, justo después de este.
  </div>
  </div>
</div>

---

## Pero, ¿De qué va Hunters Fracture?

Originalmente se tenía pensado que las diferentes facciones de ese entonces (Ocultistas, Mafiosos, Corpos, y Cyborgs), tras la derrota de la Afligida, se peleasen entre sí, con el fin de obtener el poder de la Fractura, ante esto, la asociación ordena al grupo enviado, a defender la Fractura y mantener el balance en la dimensión, mientras que ellos envían refuerzos cada cierto tiempo; la idea principal de esta trama, era tener un final abierto, con posibilidad de traer actualizaciones u DLCs al juego base, con el fin de monatr un endgame y tener una mayor rejugabilidad.

Sin embargo, con el recorte del scope para la primera Demo, en el cual se pasó de tener un loop temporal de 7 días a uno de 3, se decidió reducir la cantidad de facciones, combinando y consolidando algunas, mientras que por otro lado, se tendría que reescribir el storyline para replantear como las diferentes facciones se presentaban durante la historia al jugador.

---

## ¿Qué hay de las facciones?

Como comentamos anteriormente, los objetos únicos se podrían obtener de ciertas misiones correspondientes a las entregadas por facciones, estas serían diferentes interpretaciones de cómo podría ser Chile, si es que hubiese cambiado algo en su historia, esto desde un punto de vista ficticio y fantastico, obviamente. 

A la primera de ellas se le conoce como _El Mañana_.

![](https://i.imgur.com/hIOMlZG.gif)

### El Mañana

Luego del golpe de estado fallido, el lado socialista de la política chilena se ve potenciado y aún mas fanatico, sin embargo el país ampliamente se ve desafiado por problemas economicos debido a aranceles y prohibiciones impuestas por el norte global. Pero Chile se sigue desarollando internamente, trabajando agricultura y cobre similar a lo actual, solo que esta vez fabricamos cables y componentes utilizando el cobre. Fast forward a los años 30 Chile es una republica socialista que es economicamente bastante independiente y educada debido a su fuerte industria de manufactura y minería/agricultura renovable

---

Por otro lado, tenemos a _La Santa Franja_.

### La Santa Franja
En cuanto a la segunda facción, esta tendría un desvío en su pasado y se enfocaría en la época de la Independencia de Chile. Queríamos retratar su conexión con la Iglesia, el fanatismo religioso y otros elementos relacionados con este contexto. Uno de los puntos interesantes que planteó nuestra compañera Cori fue cómo, durante la Independencia, algunos obispos y curas se separaron de las iglesias españolas y tomaron partido por el bando chileno, adoptando una fuerte devoción hacia la Virgen del Carmen.

La primera idea que investigué fue la de un Estado totalitario, tomando como referencia la propuesta de Ame de utilizar *1984*. Como esta nueva facción surgiría a partir de una remodelación de la facción de los Ocultistas, también quería mantener una conexión con su concepto original y continuar su línea temática, pero llevándola hacia un contexto diferente. A partir de esto, llegué a la idea de que durante la Independencia de Chile, tras la derrota de Cancha Rayada, los patriotas recurrirían a un antiguo ritual para formar un pacto con la “Virgen del Carmen”. Sin embargo, la entidad con la que realmente realizan el pacto no sería ella. Gracias a este pacto, la situación del país comenzaría a mejorar: los enemigos y opositores del Estado perecerían, las riquezas comenzarían a abundar y, en general, se alcanzaría un enorme nivel de prosperidad. Sin embargo, esta entidad exigiría cada vez más del país, provocando que el Estado comenzara a cerrarse sobre sí mismo y a volverse progresivamente más autoritario y estricto, hasta finalmente fusionarse con la Iglesia. De esta manera, la religión dejaría de ser una cuestión de fe para convertirse en una verdadera doctrina de Estado.

En la actualidad, la entidad se ha vuelto incontrolable. Extrañas criaturas merodean durante la noche, provocando desapariciones inexplicables, pero quienes intentan investigar estos sucesos son silenciados sin dejar rastro. El Estado decide encubrir todo, reprimiendo cualquier levantamiento y manteniendo ante el público una imagen de perfección. Al mismo tiempo, busca impedir que extranjeros e ideas contrarias a su dogma ingresen al país y puedan hacer eco entre la población.

## Plan de Desarrollo

Ya para finalizar la semana, hablemos sobre nuestro plan de desarrollo, almenos para lo que sería el Vertical Slice que entregariamos durante Enero de 2027 y daria pie a una eventual demo en sus siguientes meses.

Hicimos una carta gantt con el fin de explicar como seria el avance durante la producción de Hunters Fracture, ya en un futuro les presentaremos un Roadmap  en condiciones de cara al lanzamiento oficial del juego en el 2027; principalmente dividimos el desarrollo en 3 equipos: Programación, Ame y Marchel, Arte, Kori y Benz, y Sonido, externos. Se preguntaran que ocurre con la historia, esta en si es redactada por el equipo de Arte y Programación en conjunto. En cuanto al sonido en si, decidimos contactarnos con chicos de la Escuela Moderna de Música en Santiago, y con un viejo compañero de la GGJ 2025, Joshua Quiroz, a pesar de ser partes del equipo en si, no pertenecen a PPCo y no son parte como tal del Proyecto de Título. 

Volviendo al plan de desarrollo, principalmente queremos sentar las bases durante agosto y septiembre, mientras que a la par, queremos hacer playtest de diferentes apartados del juego, vease combate, quests, balanceo de items, narrativa, etc. Estos playtest se realizarian a la mitad y el final de cada mes, siendo minimo 1 obligatorio al mes.

---

Sin mucho más que decir, esperemos que hayan disfrutado de este devlog, muchas gracias por acompañarnos, se despiden Ame y Marchel, buen día o/