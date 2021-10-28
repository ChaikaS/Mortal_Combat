import { enemyAttack, playerAttack } from "./attacksPlayers.js";
import generateLogs from "./generateLogs.js";
import showResult from "./showResult.js";
import { player1, player2 } from "./players.js";
import createPlayer from "./createPlayer.js";

class Game {
  start = () => {
    const $arenas = document.querySelector(".arenas");
    const $formFight = document.querySelector(".control");

    generateLogs("start", player1, player2);

    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));

    $formFight.addEventListener("submit", function (e) {
      e.preventDefault();
      const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = enemyAttack();
      const { hit: hitPlayer, defence: defencePlayer, value: valuePlayer } = playerAttack();

      if (hitPlayer !== defenceEnemy) {
        player2.changeHp(valuePlayer);
        player2.renderHP();
        generateLogs("hit", player1, player2, valuePlayer, player2.hp);
      }
      if (defencePlayer !== hitEnemy) {
        player1.changeHp(valueEnemy);
        player1.renderHP();
        generateLogs("hit", player2, player1, valueEnemy, player1.hp);
      }
      if (defencePlayer == hitEnemy) {
        generateLogs("defence", player2, player1);
      }
      if (hitPlayer == defenceEnemy) {
        generateLogs("defence", player1, player2);
      }
      showResult();
    });
  };
}

export default Game;