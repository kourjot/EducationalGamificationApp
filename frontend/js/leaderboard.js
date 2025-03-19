const leaderboardTable = document.getElementById("leaderboard");

const leaderboardData = [
    { rank: 1, name: "Alice", score: 95 },
    { rank: 2, name: "Bob", score: 90 },
    { rank: 3, name: "Charlie", score: 85 }
];

leaderboardData.forEach(player => {
    let row = leaderboardTable.insertRow();
    row.innerHTML = `<td>${player.rank}</td><td>${player.name}</td><td>${player.score}</td>`;
});
